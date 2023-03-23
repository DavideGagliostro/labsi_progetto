package com.example.piattaforme_progetto.entity;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;


@Getter
@Setter
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "allorder", schema = "orders")
public class Allorder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Basic
    @Column(name = "idorder", nullable = true, length = 45)
    private String idorder;

    @Basic
    @Column(name = "name", nullable = true, length = 45)
    private String name;

    @Basic
    @Column(name = "barcodeg", nullable = true, length = 45)
    private String barcodeg;


    @Basic
    @Column(name = "price", nullable = true)
    private float price;

    @Basic
    @Column(name = "quantity", nullable = true)
    private int quantity;









}