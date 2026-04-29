package com.example.edutrack.service;

import com.example.edutrack.dto.AuthResponse;
import com.example.edutrack.dto.LoginRequest;
import com.example.edutrack.dto.RefreshTokenRequest;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);
    AuthResponse refresh(RefreshTokenRequest request);
    void logout(String refreshToken);
}
