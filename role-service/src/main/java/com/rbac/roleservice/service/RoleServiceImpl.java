package com.rbac.roleservice.service;

import com.rbac.roleservice.dto.RoleDTO;
import com.rbac.roleservice.entity.Role;
import com.rbac.roleservice.repository.RoleRepository;
import com.rbac.roleservice.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public RoleDTO createRole(RoleDTO roleDTO) {
        Role role = Role.builder()
                .name(roleDTO.getName())
                .build();

        Role saved = roleRepository.save(role);

        return RoleDTO.builder()
                .id(saved.getId())
                .name(saved.getName())
                .build();
    }

    @Override
    public List<RoleDTO> getAllRoles() {
        return roleRepository.findAll().stream().map(role ->
                RoleDTO.builder()
                        .id(role.getId())
                        .name(role.getName())
                        .build()
        ).toList();
    }

    @Override
    public RoleDTO getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        return RoleDTO.builder()
                .id(role.getId())
                .name(role.getName())
                .build();
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}