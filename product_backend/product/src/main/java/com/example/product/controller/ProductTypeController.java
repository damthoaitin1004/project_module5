package com.example.product.controller;

import com.example.product.modal.ProductType;
import com.example.product.service.productType.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@CrossOrigin("*")
@RequestMapping("/api/type")
public class ProductTypeController {
    @Autowired
    private IProductTypeService iProductTypeService;
    @GetMapping("/list")
    public ResponseEntity<List<ProductType>> getAll(){
        List<ProductType> productTypeList = iProductTypeService.getAll();
        if (productTypeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productTypeList, HttpStatus.OK);
    }

}
