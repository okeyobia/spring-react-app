package com.okey.cardatabase.domain;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long userId;

    @Column(nullable = false, unique = true)
     private String username;

    @Column(nullable = false)
     private String password;

    @Column(nullable = false)
     private String role;

    public User() {
    }

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
