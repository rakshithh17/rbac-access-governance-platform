package com.rbac.userservice.service;

import com.rbac.userservice.entity.User;
import com.rbac.userservice.dto.UserDTO;
import com.rbac.userservice.exception.ResourceNotFoundException;
import com.rbac.userservice.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl
implements UserService {

@Autowired
private UserRepository userRepository;



/* CREATE USER */

@Override
public UserDTO createUser(
UserDTO userDTO
){

User user=
User.builder()
.username(
userDTO.getUsername()
)
.email(
userDTO.getEmail()
)
.roleId(
userDTO.getRoleId()
)
.build();


User saved=
userRepository.save(
user
);


return UserDTO.builder()
.id(
saved.getId()
)
.username(
saved.getUsername()
)
.email(
saved.getEmail()
)
.roleId(
saved.getRoleId()
)
.build();

}



/*
GET ALL USERS
used by login dropdown
*/

@Override
public List<UserDTO> getAllUsers(){

return userRepository
.findAll()
.stream()
.map(user->

UserDTO.builder()
.id(
user.getId()
)
.username(
user.getUsername()
)
.email(
user.getEmail()
)
.roleId(
user.getRoleId()
)
.build()

)
.toList();

}



/*
GET USER BY ID
no feign dependency
*/

@Override
public UserDTO getUserById(
Long id
){

User user=
userRepository.findById(id)
.orElseThrow(
()->
new ResourceNotFoundException(
"User not found"
)
);


return UserDTO.builder()
.id(
user.getId()
)
.username(
user.getUsername()
)
.email(
user.getEmail()
)
.roleId(
user.getRoleId()
)
.build();

}



/* DELETE USER */

@Override
public void deleteUser(
Long id
){
userRepository.deleteById(
id
);
}

@Override
public UserDTO updateUser(
Long id,
UserDTO dto
){

User user=
userRepository
.findById(id)
.orElseThrow();

user.setUsername(
dto.getUsername()
);

user.setEmail(
dto.getEmail()
);

user.setRoleId(
dto.getRoleId()
);

User saved=
userRepository.save(
user
);

return UserDTO.builder()
.id(saved.getId())
.username(
saved.getUsername()
)
.email(
saved.getEmail()
)
.roleId(
saved.getRoleId()
)
.build();

}

}