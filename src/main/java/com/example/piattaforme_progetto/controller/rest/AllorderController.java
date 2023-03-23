package com.example.piattaforme_progetto.controller.rest;

import com.example.piattaforme_progetto.Repository.AllorderRepository;
import com.example.piattaforme_progetto.Repository.HistoryRepository;
import com.example.piattaforme_progetto.Service.AllorderService;
import com.example.piattaforme_progetto.Service.HistoryService;
import com.example.piattaforme_progetto.Support.ResponseMessage;
import com.example.piattaforme_progetto.Support.exceptions.BarCodeAlreadyExistException;
import com.example.piattaforme_progetto.entity.Allorder;
import com.example.piattaforme_progetto.entity.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/order")

@CrossOrigin("*")
public class AllorderController {
    @Autowired
    private AllorderService allorderService;
    private AllorderRepository allorderRepositor;

    public AllorderController(AllorderRepository allorderRepository) {
        this.allorderRepositor = allorderRepository;
    }

    @GetMapping("/list")
    public List<Allorder> list() {

        return allorderService.showAllOrder();
//                ResponseEntity(productss, HttpStatus.OK);
    }


    /*
    The "listOrder" function return a list of product that have the id #+{id}
     */
    @GetMapping("/list/{id}")
    public List<Allorder> listOrder(@PathVariable("id") String id) {
        System.out.println(id);
        List<Allorder> listReturn=new ArrayList<>();
        List<Allorder> listWU=allorderService.showAllOrder();
        System.out.println(id);



        for(Allorder check:listWU){
            if(check.getIdorder().equals("#"+id)){
                listReturn.add(check);
            }
        }
        System.out.println(listReturn);
        return listReturn;

    }









}
