package com.example.product.service.product;

import com.example.product.modal.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    Page<Product> getListProduct(Pageable pageable,String search,Integer productTypeId);
    void add(Product product);
    void delete(Integer id);
    Product getById(Integer id);
    void edit(Product product);

}
