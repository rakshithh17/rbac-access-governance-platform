package com.rbac.access.dto;

import lombok.Data;

@Data
public class AccessRequest {

    private String roleName;
    private String resource;
    private String action;
}