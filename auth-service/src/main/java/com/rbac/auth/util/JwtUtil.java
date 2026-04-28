package com.rbac.auth.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "myverysecuresecretkeymyverysecuresecretkey";

    public static String generateToken(String username, String role) {

    return Jwts.builder()
            .setSubject(username)
            .claim("role", role)   // 🔥 ADD THIS
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
            .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
            .compact();
}
}