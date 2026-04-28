package com.rbac.access.service;

import com.rbac.access.dto.AccessRequest;
import com.rbac.access.entity.AccessRule;
import com.rbac.access.repository.AccessRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import com.rbac.access.entity.AccessRequestEntity;
import com.rbac.access.repository.AccessRequestRepository;
import com.rbac.access.entity.Grant;
import com.rbac.access.repository.GrantRepository;


@Service
public class AccessServiceImpl implements AccessService {

    @Autowired
    private AccessRuleRepository repository;

    @Autowired
    private AccessRequestRepository requestRepo;

    @Autowired
    private GrantRepository grantRepo;

    @Override
    public boolean checkAccess(AccessRequest request) {

        AccessRule rule = repository
                .findByRoleNameAndResourceAndAction(
                        request.getRoleName(),
                        request.getResource(),
                        request.getAction()
                )
                .orElse(null);

        if (rule == null) {
            return false; // default deny
        }

        return rule.isAllowed();
    }

    public AccessRequestEntity submitRequest(
AccessRequestEntity request
){

request.setStatus(
"PENDING"
);

request.setCreatedAt(
LocalDateTime.now()
);


/*
Multi level routing
*/

if(
"UPDATE".equalsIgnoreCase(
request.getAction()
)
){

request.setApproverRole(
"MANAGER"
);

}
else{

request.setApproverRole(
"ADMIN"
);

}


return requestRepo.save(
request
);

}

public List<AccessRequestEntity>
getAllRequests(){

return requestRepo.findAll();

}

@Override
public AccessRequestEntity approveRequest(
Long id
){

AccessRequestEntity req=
requestRepo.findById(id)
.orElseThrow();

req.setStatus(
"APPROVED"
);

requestRepo.save(req);


System.out.println(
"Creating grant for "
+ req.getUsername()
);


Grant grant=
new Grant();

grant.setUsername(
req.getUsername()
);

grant.setAssetName(
req.getAssetName()
);

grant.setAction(
req.getAction()
);


if(
"Temporary".equalsIgnoreCase(
req.getDuration()
)
){
grant.setExpiresAt(
LocalDateTime.now()
.plusMinutes(5)
);
}


Grant saved=
grantRepo.save(
grant
);


System.out.println(
"Grant saved id="
+ saved.getId()
);

return req;

}

public AccessRequestEntity rejectRequest(
Long id
){

AccessRequestEntity req=
requestRepo.findById(id)
.orElseThrow();

req.setStatus(
"REJECTED"
);

return requestRepo.save(req);

}

public List<Grant>
getGrants(
String user
){

return grantRepo
.findByUsername(user)
.stream()
.filter(g->

g.getExpiresAt()==null
||

g.getExpiresAt()
.isAfter(
java.time.LocalDateTime.now()
)

)
.toList();

}

public List<AccessRule> getAllRules(){
return repository.findAll();
}

}