package com.example.edutrack.service;

import com.example.edutrack.dto.AuthResponse;
import com.example.edutrack.dto.LoginRequest;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);
}
