package com.rbac.access.repository;

import com.rbac.access.entity.AccessRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessRequestRepository
extends JpaRepository<
AccessRequestEntity,
Long
>{

}