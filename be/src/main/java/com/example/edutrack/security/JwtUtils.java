package com.example.edutrack.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtils {

    // Using a longer secret for HS256
    private final String jwtSecret = "edutrack_horizon_enterprise_secret_key_2026_jwt_token_signing_key";
    private final int jwtExpirationMs = 86400000; // 24 hours

    private Key key() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwtToken(Authentication authentication) {
        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim("id", userPrincipal.getId().toString())
                .claim("role", userPrincipal.getRole())
                .claim("institutionId", userPrincipal.getInstitutionId().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getPhoneFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public UUID getInstitutionIdFromJwtToken(String token) {
        String idStr = Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().get("institutionId", String.class);
        return UUID.fromString(idStr);
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // log error
        }
        return false;
    }
}
