package com.example.piattaforme_progetto.controller.rest;

import com.example.piattaforme_progetto.Repository.CheckoutRepository;
import com.example.piattaforme_progetto.Repository.ProductRepository;
import com.example.piattaforme_progetto.Service.CheckoutService;
import com.example.piattaforme_progetto.Support.ResponseMessage;
import com.example.piattaforme_progetto.Support.exceptions.BarCodeAlreadyExistException;
import com.example.piattaforme_progetto.entity.Checkout;
import com.example.piattaforme_progetto.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/checkout")

@CrossOrigin("*")
public class CheckoutController {
    @Autowired
    private CheckoutService checkoutService;
    private CheckoutRepository checkoutRepositor;

    public CheckoutController(CheckoutRepository checkoutRepository) {
        this.checkoutRepositor = checkoutRepository;
    }

    @GetMapping("/list")
    public List<Checkout> list() {
        return checkoutService.showAllProducts();
//                ResponseEntity(productss, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody @Valid Checkout product) {

        try {
            if(checkoutRepositor.findByBarcodeg(product.getBarcodeg())==null){
                checkoutService.addCheckout(product);
                System.out.println("prodotto nuovo");
            }else {
                System.out.println("prodotto gia esistente");
                Checkout cn=new Checkout();
                cn=product;
                cn.setQuantity(checkoutRepositor.findByBarcodeg(product.getBarcodeg()).getQuantity()+1);
                checkoutRepositor.delete(checkoutRepositor.findByBarcodeg(product.getBarcodeg()));

                checkoutService.addCheckout(cn);

            }
        } catch (BarCodeAlreadyExistException e) {
            return new ResponseEntity<>("Barcode already exi st!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Added successful!"), HttpStatus.OK);
    }





    @GetMapping("/allProducts)")
    public List<Checkout> getAll() {

        return checkoutService.showAllProducts();
    }


    @GetMapping("/complete")
    public void closeOrder() {
        checkoutRepositor.deleteAll();
    }



    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        Checkout pro=checkoutRepositor.findById(id);
        checkoutRepositor.delete(pro);


    }




    @GetMapping("/getC/{id}")
    public ResponseEntity getByBarcode(@PathVariable("id")  int id) throws BarCodeAlreadyExistException {
        System.out.println(id);
        Checkout result = checkoutRepositor.findById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



}
