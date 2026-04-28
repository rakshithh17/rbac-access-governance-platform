package com.rbac.access.repository;

import com.rbac.access.entity.Grant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrantRepository
extends JpaRepository<
Grant,
Long
>{

List<Grant> findByUsername(
String username
);

}