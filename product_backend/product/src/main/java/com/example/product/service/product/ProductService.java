package com.example.product.service.product;

import com.example.product.modal.Product;
import com.example.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Override
    public Page<Product> getListProduct(Pageable pageable, String search) {

        return productRepository.findAllProduct(pageable,"%"+search+"%");
    }

    @Override
    public void add(Product product) {

    }

    @Override
    public void delete(Integer id) {
         productRepository.deleteProduct(id);
    }

    @Override
    public void edit(Product product) {
        productRepository.updateProduct(product.getName(), product.getStartDay(), product.getQuantity(), product.getId(),product.getProductType().getId());
    }

    @Override
    public Product getById(Integer id) {
        return productRepository.getById(id);
    }
}
