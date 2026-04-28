package com.rbac.auth.service;

import com.rbac.auth.dto.LoginRequest;
import com.rbac.auth.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
}