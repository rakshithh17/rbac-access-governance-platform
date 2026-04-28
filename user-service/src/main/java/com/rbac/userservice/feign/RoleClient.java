package com.rbac.userservice.feign;

import com.rbac.userservice.external.RoleDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ROLE-SERVICE")
public interface RoleClient {

    @GetMapping("/roles/{id}")
    RoleDTO getRoleById(@PathVariable Long id);
}