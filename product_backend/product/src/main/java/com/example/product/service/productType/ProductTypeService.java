package com.example.product.service.productType;

import com.example.product.modal.Product;
import com.example.product.modal.ProductType;
import com.example.product.repository.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService implements IProductTypeService{
    @Autowired
    private ProductTypeRepository productTypeRepository;
    @Override
    public List<ProductType> getAll() {
        return productTypeRepository.findAllProductType();
    }
}
