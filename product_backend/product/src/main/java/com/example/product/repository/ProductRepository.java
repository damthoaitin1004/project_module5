package com.example.product.repository;

import com.example.product.modal.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "select * from product.product where flag = true and name like :name ", nativeQuery = true)
    Page<Product> findAllProduct(Pageable pageable, @Param(value = "name") String name);
//    @Query(value = "insert into  product.product (id, code, flag, name, start_day, product_type_id, quantity) VALUES ()
    @Query(value = " select * from product.product where flag = true and id = :id ",nativeQuery = true)
    Product getById(@Param(value = "id") Integer id);
    @Modifying
    @Transactional
    @Query(value = "update product.product set name = :name,start_day=:start_day,quantity=:quantity,product_type_id=:product_type_id where id=:id",nativeQuery = true)
    void updateProduct(@Param(value = "name") String name,@Param(value = "start_day") String startDay,@Param(value ="quantity")Long quantity,@Param(value = "id") Integer id,@Param(value ="product_type_id") Integer productTypeId);
    @Modifying
    @Transactional
    @Query(value = "update product.product set flag = false where id = :id",nativeQuery = true)
    void deleteProduct(@Param(value="id") Integer id);
    @Modifying
    @Transactional
    @Query(value = "insert into product.product value ()")
}
