package com.rbac.access.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="user_grants")
public class Grant {

@Id
@GeneratedValue(
strategy=
GenerationType.IDENTITY
)
private Long id;

private String username;

private String assetName;

private String action;

private LocalDateTime expiresAt;



public Long getId(){
return id;
}

public void setId(Long id){
this.id=id;
}

public String getUsername(){
return username;
}

public void setUsername(
String username
){
this.username=username;
}

public String getAssetName(){
return assetName;
}

public void setAssetName(
String assetName
){
this.assetName=assetName;
}

public String getAction(){
return action;
}

public void setAction(
String action
){
this.action=action;
}

public LocalDateTime getExpiresAt(){
return expiresAt;
}

public void setExpiresAt(
LocalDateTime expiresAt
){
this.expiresAt=expiresAt;
}

}