package com.example.edutrack.service.impl;

import com.example.edutrack.dto.AuthResponse;
import com.example.edutrack.dto.LoginRequest;
import com.example.edutrack.dto.UserDto;
import com.example.edutrack.security.CustomUserDetails;
import com.example.edutrack.security.CustomUserDetailsService;
import com.example.edutrack.security.JwtUtils;
import com.example.edutrack.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        logger.info("Login attempt for institution: {} and phone: {}", 
                loginRequest.getInstitutionId(), loginRequest.getPhone());

        // Load user by institution and phone for authentication
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByInstitutionAndPhone(
                loginRequest.getInstitutionId(), loginRequest.getPhone());

        // Validate password
        if (!passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDto userDto = UserDto.builder()
                .id(userDetails.getId())
                .name(userDetails.getUsername()) // phone in this case, or get real name?
                .phone(userDetails.getPhone())
                .role(userDetails.getRole())
                .institutionId(userDetails.getInstitutionId())
                .build();

        return AuthResponse.builder()
                .accessToken(jwt)
                .user(userDto)
                .build();
    }
}
