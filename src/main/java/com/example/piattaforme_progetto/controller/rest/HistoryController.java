package com.example.piattaforme_progetto.controller.rest;

import com.example.piattaforme_progetto.Repository.HistoryRepository;

import com.example.piattaforme_progetto.Service.HistoryService;
import com.example.piattaforme_progetto.Support.ResponseMessage;
import com.example.piattaforme_progetto.Support.exceptions.BarCodeAlreadyExistException;

import com.example.piattaforme_progetto.entity.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/history")

@CrossOrigin("*")
public class HistoryController {
    @Autowired
    private HistoryService historyService;
    private HistoryRepository historyRepositor;

    public HistoryController(HistoryRepository historyRepository) {
        this.historyRepositor = historyRepository;
    }


    /*
    Return the list of History
     */
    @GetMapping("/list")
    public List<History> list() {
        System.out.println(historyService.showAllProducts().get(1).getPrice());
        return historyService.showAllProducts();
//                ResponseEntity(productss, HttpStatus.OK);
    }



    /*
    Returns the user History
     */
    @GetMapping("/list/{id}")
    public List<History> listUser(@PathVariable("id") String id) {
        List<History> listReturn=new ArrayList<>();
        List<History> listWU=historyService.showAllProducts();
        System.out.println(id);



        for(History check:listWU){
            if(check.getIduser().equals(id)){
                listReturn.add(check);
            }
        }
        System.out.println(listReturn);
        return listReturn;

    }

    /*
    The "Create" function, adds a product to the history table only if it does not already exist in the table.
     */
    @PostMapping("/create")
    public ResponseEntity create(@RequestBody @Valid History product) {

        try {

            if(historyRepositor.findByBarcodeg(product.getBarcodeg())==null){
                historyService.addHistory(product);
                System.out.println(product );
                System.out.println("prodotto nuovo");
            }else {
                System.out.println("prodotto gia esistente");

                }




        } catch (BarCodeAlreadyExistException e) {
            return new ResponseEntity<>("Barcode already exi st!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Added successful!"), HttpStatus.OK);
    }







}
