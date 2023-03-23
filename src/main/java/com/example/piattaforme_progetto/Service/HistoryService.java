package com.example.piattaforme_progetto.Service;

import com.example.piattaforme_progetto.Repository.HistoryRepository;
import com.example.piattaforme_progetto.Support.exceptions.BarCodeAlreadyExistException;
import com.example.piattaforme_progetto.entity.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;

    @Transactional(readOnly = false)
    public void addHistory(History history) throws BarCodeAlreadyExistException {
        historyRepository.save(history);
    }

    @Transactional(readOnly = true)
    public List<History> showAllProducts() {
        return historyRepository.findAll();
    }


}
