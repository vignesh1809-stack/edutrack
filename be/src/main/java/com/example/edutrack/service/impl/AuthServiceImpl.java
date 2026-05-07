package com.example.edutrack.service.impl;

import com.example.edutrack.dto.AuthResponse;
import com.example.edutrack.dto.LoginRequest;
import com.example.edutrack.dto.RefreshTokenRequest;
import com.example.edutrack.dto.UserDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.security.CustomUserDetailsService;
import com.example.edutrack.security.JwtUtils;
import com.example.edutrack.service.AuthService;
import com.example.edutrack.service.RefreshTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Autowired private JwtUtils jwtUtils;
    @Autowired private CustomUserDetailsService userDetailsService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private RefreshTokenService refreshTokenService;

    // ── Login ─────────────────────────────────────────────────────────────────

    @Override
    @Transactional
    public AuthResponse login(LoginRequest loginRequest) {
        logger.info("Login attempt — institution: {}, phone: {}, role: {}",
                loginRequest.getInstitutionId(), loginRequest.getPhone(), loginRequest.getRole());

        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService
                .loadUserByInstitutionAndPhone(
                        loginRequest.getInstitutionId(),
                        loginRequest.getPhone(),
                        loginRequest.getRole()
                );

        if (!passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken  = jwtUtils.generateJwtToken(authentication);
        String refreshToken = jwtUtils.generateRefreshToken(authentication);

        // Persist the refresh token JTI in Redis so we can revoke it on logout.
        String jti = jwtUtils.getJtiFromToken(refreshToken);
        refreshTokenService.store(jti, userDetails.getId().toString());

        UserDto userDto = UserDto.builder()
                .id(userDetails.getId())
                .name(userDetails.getName())
                .phone(userDetails.getPhone())
                .role(userDetails.getRole())
                .institutionId(userDetails.getInstitutionId())
                .departmentName(userDetails.getDepartmentName())
                .avatarUrl(userDetails.getAvatarUrl())
                .build();

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .user(userDto)
                .build();
    }

    // ── Refresh Token ─────────────────────────────────────────────────────────

    @Override
    @Transactional
    public AuthResponse refresh(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        if (!jwtUtils.validateRefreshToken(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        String oldJti = jwtUtils.getJtiFromToken(refreshToken);
        if (!refreshTokenService.exists(oldJti)) {
            throw new RuntimeException("Refresh token has been revoked");
        }

        UUID institutionId = jwtUtils.getInstitutionIdFromJwtToken(refreshToken);
        String phone       = jwtUtils.getPhoneFromJwtToken(refreshToken);
        String role        = jwtUtils.getRoleFromJwtToken(refreshToken);

        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService
                .loadUserByInstitutionAndPhone(institutionId, phone, role);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        String newAccessToken  = jwtUtils.generateJwtToken(authentication);
        String newRefreshToken = jwtUtils.generateRefreshToken(authentication);

        // Rotate: revoke old JTI, store new one.
        refreshTokenService.revoke(oldJti);
        String newJti = jwtUtils.getJtiFromToken(newRefreshToken);
        refreshTokenService.store(newJti, userDetails.getId().toString());

        logger.info("Tokens refreshed for phone: {}, role: {}", phone, role);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .tokenType("Bearer")
                .build();
    }

    // ── Logout ────────────────────────────────────────────────────────────────

    @Override
    public void logout(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) return;
        try {
            if (jwtUtils.validateRefreshToken(refreshToken)) {
                String jti = jwtUtils.getJtiFromToken(refreshToken);
                refreshTokenService.revoke(jti);
                logger.info("Refresh token revoked — jti: {}", jti);
            }
        } catch (Exception e) {
            logger.warn("Logout called with unparseable token: {}", e.getMessage());
        }
    }
}
