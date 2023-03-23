package com.example.piattaforme_progetto.Service;

import com.example.piattaforme_progetto.Repository.AllorderRepository;
import com.example.piattaforme_progetto.Repository.HistoryRepository;
import com.example.piattaforme_progetto.Support.exceptions.BarCodeAlreadyExistException;
import com.example.piattaforme_progetto.entity.Allorder;
import com.example.piattaforme_progetto.entity.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AllorderService {
    @Autowired
    private AllorderRepository allorderRepository;

    @Transactional(readOnly = false)
    public void addOrder(Allorder order) {
        allorderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public List<Allorder> showAllOrder() {
        return allorderRepository.findAll();
    }


}
