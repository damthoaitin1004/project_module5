package com.example.product.controller;

import com.example.product.modal.Product;
import com.example.product.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private IProductService iProductService;

    @GetMapping("/product")
    public ResponseEntity<Page<Product>> getProduct(@RequestParam(defaultValue = "0", required = false) int page,
                                                    @RequestParam(defaultValue = "", required = false) String searchName) {
        Pageable pageable = PageRequest.of(page, 3, Sort.by("name").ascending());
        Page<Product> productPage = iProductService.getListProduct(pageable, searchName);
        System.out.println(productPage.isEmpty());
//        if (productPage.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> detailProduct(@PathVariable int id) {
        Product product = iProductService.getById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/edit")
    public void editProduct(@RequestBody Product product){
         iProductService.edit(product);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable int id) {
       iProductService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
