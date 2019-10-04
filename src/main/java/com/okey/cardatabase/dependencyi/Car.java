package com.okey.cardatabase.dependencyi;


import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;

public class Car {

    @Resource
    private ConfigFileResource cfile;

    private Owner owner;
    public Car(Owner owner) { // DI dependency is passed as a parameter.
        this.owner = owner;
    }
}
