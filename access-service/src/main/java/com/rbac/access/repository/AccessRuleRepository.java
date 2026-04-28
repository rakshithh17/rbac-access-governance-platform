package com.rbac.access.repository;

import com.rbac.access.entity.AccessRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccessRuleRepository extends JpaRepository<AccessRule, Long> {

    Optional<AccessRule> findByRoleNameAndResourceAndAction(
            String roleName,
            String resource,
            String action
    );
}