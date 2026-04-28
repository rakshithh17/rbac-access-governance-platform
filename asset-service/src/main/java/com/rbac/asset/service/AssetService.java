package com.rbac.asset.service;

import com.rbac.asset.entity.Asset;

import java.util.List;

public interface AssetService {

    Asset create(Asset asset);

    List<Asset> getAll();

    void delete(Long id);

    Asset update(Long id,Asset asset);
}