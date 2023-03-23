package com.example.piattaforme_progetto.Repository;


import com.example.piattaforme_progetto.entity.Allorder;
import com.example.piattaforme_progetto.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllorderRepository extends JpaRepository<Allorder, Integer> {

    Allorder findById(int id);

    List<Allorder> findByBarcodeg(String barCode);
}

