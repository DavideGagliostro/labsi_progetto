package com.example.piattaforme_progetto.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "history", schema = "orders")
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

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


    @Basic
    @Column(name = "iduser", nullable = true, length = 45)
    private String iduser;








}