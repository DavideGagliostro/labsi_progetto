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
@Table(name = "cart", schema = "orders")
public class Checkout {

    public Checkout(String name,String barcode,String description,float price,int quantity,String barcodeg,String image,String idUser){

        this.name=name;
        this.barCode=barcode;
        this.description=description;
        this.price=price;
        this.quantity=quantity;
        this.barcodeg=barcodeg;
        this.image=image;
        this.iduser=idUser;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Basic
    @Column(name = "name", nullable = true, length = 50)
    private String name;

    @Basic
    @Column(name = "bar_code",  nullable = true, length = 70)
    private String barCode;

    @Basic
    @Column(name = "description", nullable = true, length = 500)
    private String description;

    @Basic
    @Column(name = "price", nullable = true)
    private float price;

    @Basic
    @Column(name = "quantity", nullable = true)
    private int quantity;


    @Basic
    @Column(name = "barcodeg", nullable = true, length = 200)
    private String barcodeg;


    @Basic
    @Column(name = "image", nullable = true, length = 45)
    private String image;

    @Basic
    @Column(name = "iduser", nullable = true, length = 45)
    private String iduser;

    public Checkout() {

    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}