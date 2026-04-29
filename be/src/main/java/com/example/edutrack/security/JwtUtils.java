package com.example.edutrack.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // ── Read from application.properties ─────────────────────────────────────
    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.access-token-expiration-ms}")
    private long accessTokenExpirationMs;

    @Value("${app.jwt.refresh-token-expiration-ms}")
    private long refreshTokenExpirationMs;
    // ─────────────────────────────────────────────────────────────────────────

    private Key key() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // ── Access Token ─────────────────────────────────────────────────────────

    public String generateJwtToken(Authentication authentication) {
        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
        return buildToken(
                userPrincipal.getUsername(),
                userPrincipal.getId().toString(),
                userPrincipal.getRole(),
                userPrincipal.getInstitutionId().toString(),
                "access",
                accessTokenExpirationMs
        );
    }

    // ── Refresh Token ────────────────────────────────────────────────────────

    public String generateRefreshToken(Authentication authentication) {
        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
        return buildRefreshToken(
                userPrincipal.getUsername(),
                userPrincipal.getId().toString(),
                userPrincipal.getRole(),
                userPrincipal.getInstitutionId().toString()
        );
    }

    /** Re-issue a new access token from a validated refresh token. */
    public String generateAccessTokenFromRefreshToken(String refreshToken) {
        Claims claims = parseClaims(refreshToken);
        return buildToken(
                claims.getSubject(),
                claims.get("id", String.class),
                claims.get("role", String.class),
                claims.get("institutionId", String.class),
                "access",
                accessTokenExpirationMs
        );
    }

    // ── Shared Token Builders ────────────────────────────────────────────────

    private String buildToken(String phone, String id, String role,
                              String institutionId, String tokenType, long expiryMs) {
        return Jwts.builder()
                .setSubject(phone)
                .claim("id", id)
                .claim("role", role)
                .claim("institutionId", institutionId)
                .claim("tokenType", tokenType)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiryMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Refresh tokens carry a unique JTI so they can be individually revoked in Redis.
    private String buildRefreshToken(String phone, String id, String role, String institutionId) {
        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(phone)
                .claim("id", id)
                .claim("role", role)
                .claim("institutionId", institutionId)
                .claim("tokenType", "refresh")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ── Claims Extraction ────────────────────────────────────────────────────

    public String getPhoneFromJwtToken(String token) {
        return parseClaims(token).getSubject();
    }

    public String getIdFromJwtToken(String token) {
        return parseClaims(token).get("id", String.class);
    }

    public UUID getInstitutionIdFromJwtToken(String token) {
        return UUID.fromString(parseClaims(token).get("institutionId", String.class));
    }

    public String getRoleFromJwtToken(String token) {
        return parseClaims(token).get("role", String.class);
    }

    public String getTokenType(String token) {
        return parseClaims(token).get("tokenType", String.class);
    }

    public String getJtiFromToken(String token) {
        return parseClaims(token).getId();
    }

    public long getRefreshTokenExpirationMs() {
        return refreshTokenExpirationMs;
    }

    // ── Validation ───────────────────────────────────────────────────────────

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            logger.warn("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.warn("JWT token is unsupported: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.warn("JWT token is malformed: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warn("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    /** Returns true only if the token is valid AND is a refresh token. */
    public boolean validateRefreshToken(String token) {
        if (!validateJwtToken(token)) return false;
        return "refresh".equals(getTokenType(token));
    }

    // ── Private Helpers ──────────────────────────────────────────────────────

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
