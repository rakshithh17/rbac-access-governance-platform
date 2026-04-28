package com.rbac.access.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="access_requests")
public class AccessRequestEntity {

@Id
@GeneratedValue(
strategy=GenerationType.IDENTITY
)
private Long id;

private String username;

private String assetName;

private String action;

private String duration;

private String status;

/*
NEW
who must approve
*/
private String approverRole;

private LocalDateTime createdAt;



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


public String getDuration(){
return duration;
}

public void setDuration(
String duration
){
this.duration=duration;
}


public String getStatus(){
return status;
}

public void setStatus(
String status
){
this.status=status;
}


public String getApproverRole(){
return approverRole;
}

public void setApproverRole(
String approverRole
){
this.approverRole=
approverRole;
}


public LocalDateTime getCreatedAt(){
return createdAt;
}

public void setCreatedAt(
LocalDateTime createdAt
){
this.createdAt=
createdAt;
}

}