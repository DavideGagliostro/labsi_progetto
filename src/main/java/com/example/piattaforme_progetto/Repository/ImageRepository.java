package com.example.piattaforme_progetto.Repository;

import com.example.piattaforme_progetto.entity.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface ImageRepository extends JpaRepository<ImageModel, Long> {
    ImageModel findByName(String name);
}
