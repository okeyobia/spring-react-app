package com.okey.cardatabase.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
public class Car {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String brand, model, color, registerNumber;
    private int year, price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner")
    private Owner owner;

    public Car() {
    }

    public Car(String brand, String model, String color, String registerNumber, int year, int price) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.registerNumber = registerNumber;
        this.year = year;
        this.price = price;

    }

    public Car(String brand, String model, String color, String registerNumber, int year, int price, Owner owner) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.registerNumber = registerNumber;
        this.year = year;
        this.price = price;
        this.owner = owner;
    }
}
