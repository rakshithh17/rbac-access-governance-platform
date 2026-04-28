package com.rbac.userservice.controller;

import com.rbac.userservice.dto.UserDTO;
import com.rbac.userservice.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

@Autowired
private UserService userService;



@PostMapping
public UserDTO createUser(
@RequestBody UserDTO dto
){
return userService.createUser(
dto
);
}



@GetMapping
public List<UserDTO> getAllUsers(){
return userService.getAllUsers();
}



@GetMapping("/{id}")
public UserDTO getUserById(
@PathVariable Long id
){
return userService.getUserById(
id
);
}



@PutMapping("/{id}")
public UserDTO updateUser(
@PathVariable Long id,
@RequestBody UserDTO dto
){
return userService.updateUser(
id,
dto
);
}



@DeleteMapping("/{id}")
public String deleteUser(
@PathVariable Long id
){
userService.deleteUser(
id
);
return "User deleted";
}

}