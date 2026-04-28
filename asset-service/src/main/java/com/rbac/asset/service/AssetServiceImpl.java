package com.rbac.asset.service;

import com.rbac.asset.entity.Asset;
import com.rbac.asset.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository repository;

    @Override
    public Asset create(Asset asset) {
        return repository.save(asset);
    }

    @Override
    public List<Asset> getAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
public Asset update(
Long id,
Asset asset
){

Asset existing=
repository.findById(id)
.orElseThrow();

existing.setName(
asset.getName()
);

existing.setType(
asset.getType()
);

return repository.save(
existing
);

}
}