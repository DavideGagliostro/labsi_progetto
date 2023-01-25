package com.example.piattaforme_progetto.Service;

import com.example.piattaforme_progetto.Repository.CheckoutRepository;
import com.example.piattaforme_progetto.Support.exceptions.BarCodeAlreadyExistException;
import com.example.piattaforme_progetto.entity.Checkout;
import com.example.piattaforme_progetto.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class CheckoutService {
    @Autowired
    private CheckoutRepository checkoutRepository;

    @Transactional(readOnly = false)
    public void addCheckout(Checkout product) throws BarCodeAlreadyExistException {

        checkoutRepository.save(product);
    }

    @Transactional(readOnly = true)
    public List<Checkout> showAllProducts() {
        return checkoutRepository.findAll();
    }


}
