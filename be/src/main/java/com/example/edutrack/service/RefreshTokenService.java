package com.example.edutrack.service;

public interface RefreshTokenService {
    void store(String jti, String userId);
    boolean exists(String jti);
    void revoke(String jti);
}
