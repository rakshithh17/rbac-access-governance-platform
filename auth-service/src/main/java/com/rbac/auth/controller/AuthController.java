package com.rbac.auth.controller;

import com.rbac.auth.dto.LoginRequest;
import com.rbac.auth.service.AuthService;
import com.rbac.auth.dto.LoginResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

   @Autowired
private AuthService authService;

@PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {
    return authService.login(request);
}
}