package com.rbac.access.controller;

import com.rbac.access.dto.AccessRequest;
import com.rbac.access.entity.AccessRequestEntity;
import com.rbac.access.service.AccessService;
import com.rbac.access.entity.Grant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.rbac.access.entity.AccessRule;
import java.util.List;

@RestController
@RequestMapping("/access")
public class AccessController {

@Autowired
private AccessService service;



/* Existing RBAC check endpoint */

@PostMapping("/check")
public boolean checkAccess(
@RequestBody AccessRequest request
){
return service.checkAccess(
request
);
}



/* New workflow request endpoint */

@PostMapping("/requests")
public AccessRequestEntity submitRequest(
@RequestBody
AccessRequestEntity request
){

return service.submitRequest(
request
);

}



/* Get all requests */

@GetMapping("/requests")
public List<AccessRequestEntity>
getRequests(){

return service.getAllRequests();

}

@PutMapping(
"/requests/{id}/approve"
)
public AccessRequestEntity approve(
@PathVariable Long id
){
return service.approveRequest(
id
);
}

@PutMapping(
"/requests/{id}/reject"
)
public AccessRequestEntity reject(
@PathVariable Long id
){
return service.rejectRequest(
id
);
}

@GetMapping(
"/grants/{user}"
)
public List<Grant>
getGrants(
@PathVariable
String user
){
return service.getGrants(
user
);
}

@GetMapping("/rules")
public List<AccessRule> getRules(){
return service.getAllRules();
}

}