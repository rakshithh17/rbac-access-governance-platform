package com.rbac.access.service;

import com.rbac.access.dto.AccessRequest;
import com.rbac.access.entity.AccessRequestEntity;
import com.rbac.access.entity.Grant;
import com.rbac.access.entity.AccessRule;
import java.util.List;

public interface AccessService {

boolean checkAccess(
AccessRequest request
);


AccessRequestEntity submitRequest(
AccessRequestEntity request
);

List<AccessRule> getAllRules();


List<AccessRequestEntity>
getAllRequests();

AccessRequestEntity approveRequest(
Long id
);

AccessRequestEntity rejectRequest(
Long id
);

List<Grant>
getGrants(
String user
);

}