package com.example.edutrack.service.impl;

import com.example.edutrack.security.JwtUtils;
import com.example.edutrack.service.RefreshTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenServiceImpl.class);
    private static final String KEY_PREFIX = "rt:";

    @Autowired private StringRedisTemplate redisTemplate;
    @Autowired private JwtUtils jwtUtils;

    // In-memory fallback token store for local dev when Redis is not running
    private final ConcurrentHashMap<String, String> tokenMap = new ConcurrentHashMap<>();

    // When true (production): Redis failure aborts the request.
    // When false (default/dev): Redis failure is logged as a warning and the
    // request succeeds — token revocation is simply skipped until Redis is up.
    @Value("${app.redis.required:false}")
    private boolean redisRequired;

    @Override
    public void store(String jti, String userId) {
        try {
            redisTemplate.opsForValue().set(
                KEY_PREFIX + jti,
                userId,
                Duration.ofMillis(jwtUtils.getRefreshTokenExpirationMs())
            );
        } catch (DataAccessException e) {
            tokenMap.put(jti, userId);
            handleRedisFailure("store refresh token", e);
        }
    }

    @Override
    public boolean exists(String jti) {
        try {
            return Boolean.TRUE.equals(redisTemplate.hasKey(KEY_PREFIX + jti));
        } catch (DataAccessException e) {
            handleRedisFailure("validate refresh token", e);
            // Degrade gracefully: return true if the token is present in the in-memory fallback,
            // or if the fallback is empty (which might happen if backend restarted, to avoid logging out users)
            return tokenMap.containsKey(jti) || tokenMap.isEmpty();
        }
    }

    @Override
    public void revoke(String jti) {
        try {
            redisTemplate.delete(KEY_PREFIX + jti);
        } catch (DataAccessException e) {
            logger.warn("[Redis] Could not revoke refresh token jti={} — Redis unavailable: {}", jti, e.getMessage());
        }
        tokenMap.remove(jti);
    }

    private void handleRedisFailure(String operation, DataAccessException e) {
        if (redisRequired) {
            logger.error("[Redis] FATAL — {} failed. Redis is required in this environment: {}", operation, e.getMessage());
            throw new RuntimeException("Authentication service unavailable — please contact support.");
        }
        logger.warn("[Redis] {} failed — running with in-memory token fallback (set app.redis.required=true in production): {}",
                operation, e.getMessage());
    }
}
