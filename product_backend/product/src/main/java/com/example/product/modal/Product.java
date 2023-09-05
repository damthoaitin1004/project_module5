package com.example.product.modal;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String name;
    @Column(name = "start_day",columnDefinition = "date")
    private String startDay;
    private Long quantity;
    @Column(columnDefinition = "bit(1) default true")
    private Boolean flag = true;
    @ManyToOne
    @JoinColumn(name = "product_type_id",referencedColumnName = "id",nullable = false)
    private ProductType productType;

    public Product() {
    }

    public Product(Integer id, String code, String name, String startDay, Long quantity, Boolean flag, ProductType productType) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.startDay = startDay;
        this.quantity = quantity;
        this.flag = flag;
        this.productType = productType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStartDay() {
        return startDay;
    }

    public void setStartDay(String startDay) {
        this.startDay = startDay;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public Boolean getFlag() {
        return flag;
    }

    public void setFlag(Boolean flag) {
        this.flag = flag;
    }
}
