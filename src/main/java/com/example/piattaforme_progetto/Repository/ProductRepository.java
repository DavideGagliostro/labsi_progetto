package com.example.piattaforme_progetto.Repository;

import com.example.piattaforme_progetto.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContaining(String name);



    Product findByBarcodeg(String barcode);




    Product findById(int id);
    boolean existsByBarcodeg(String barCode);
}
