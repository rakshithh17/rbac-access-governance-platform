package com.rbac.roleservice.service;

import com.rbac.roleservice.dto.RoleDTO;

import java.util.List;

public interface RoleService {

    RoleDTO createRole(RoleDTO roleDTO);

    List<RoleDTO> getAllRoles();

    RoleDTO getRoleById(Long id);

    void deleteRole(Long id);
}