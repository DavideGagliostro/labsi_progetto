package com.example.piattaforme_progetto.Repository;


import com.example.piattaforme_progetto.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer> {

    History findById(int id);

    List<History> findByBarcodeg(String barCode);
}

