package com.rbac.auth.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "auth_users")
@Data
public class AuthUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String roleName;
    private String password;
}