package com.example.product.repository;

import com.example.product.modal.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductTypeRepository extends JpaRepository<ProductType, Integer> {
    @Query(value = "select * from product_type ",nativeQuery = true)
    List<ProductType> findAllProductType();
}
