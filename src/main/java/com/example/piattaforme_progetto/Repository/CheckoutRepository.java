package com.example.piattaforme_progetto.Repository;

import com.example.piattaforme_progetto.entity.Checkout;
import com.example.piattaforme_progetto.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {
    List<Checkout> findByNameContaining(String name);
    List<Checkout> findByBarCode(String name);



    Checkout findById(int id);
    boolean existsByBarCode(String barCode);

    List<Checkout> findByBarcodeg(String barCode);
}

