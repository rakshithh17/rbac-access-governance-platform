package com.rbac.asset.controller;

import com.rbac.asset.entity.Asset;
import com.rbac.asset.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

@Autowired
private AssetService service;


@PostMapping
public Asset create(
@RequestBody Asset asset
){
return service.create(asset);
}


@GetMapping
public List<Asset> getAll(){
return service.getAll();
}


/* NEW UPDATE */

@PutMapping("/{id}")
public Asset update(
@PathVariable Long id,
@RequestBody Asset asset
){
return service.update(
id,
asset
);
}


@DeleteMapping("/{id}")
public String delete(
@PathVariable Long id
){
service.delete(id);
return "Asset deleted";
}

}