package com.rbac.auth.service;

import com.rbac.auth.dto.LoginRequest;
import com.rbac.auth.dto.LoginResponse;
import com.rbac.auth.entity.AuthUser;
import com.rbac.auth.repository.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rbac.auth.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthUserRepository repository;

    @Override
public LoginResponse login(LoginRequest request) {

    AuthUser user = repository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!user.getPassword().equals(request.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    String token = JwtUtil.generateToken(user.getUsername(),user.getRoleName());

    return new LoginResponse(token);
}
}