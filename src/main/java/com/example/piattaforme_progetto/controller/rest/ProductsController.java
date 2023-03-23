package com.example.piattaforme_progetto.controller.rest;

import com.example.piattaforme_progetto.Repository.ImageRepository;
import com.example.piattaforme_progetto.Repository.ProductRepository;
import com.example.piattaforme_progetto.Service.ProductService;
import com.example.piattaforme_progetto.Support.ResponseMessage;
import com.example.piattaforme_progetto.Support.exceptions.BarCodeAlreadyExistException;
import com.example.piattaforme_progetto.entity.Checkout;
import com.example.piattaforme_progetto.entity.ImageModel;
import com.example.piattaforme_progetto.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


@RestController
@RequestMapping("/products")

@CrossOrigin("*")
public class ProductsController {

    @Autowired
    private ProductService productService;
    private ProductRepository productRepositor;


    public ProductsController(ProductRepository productRepositor) {
        this.productRepositor = productRepositor;
    }

    /*
    In this case, since Keycloak is being used, specific that the role that can interact to obtain the list
    MUST be registered and logged in.
     */
    @RolesAllowed("backend-user")
    @GetMapping("/list")
    public List<Product> list() {
        return productService.showAllProducts();
//                ResponseEntity(productss, HttpStatus.OK);
    }
 /*
  The purpose of the "Create" function is to add a product to the warehouse, with the ultimate goal of adding it to the database.
  However, before adding it to the database, a check is performed to verify that the product being added is not already present
  in the database. In the event that the product is already present in the database, an exception is raised.

  */
    @PostMapping("/create")
    public ResponseEntity create(@RequestBody @Valid Product product) throws InterruptedException {
        System.out.println("sto creando il prodotto... "+product);
        TimeUnit.SECONDS.sleep(1);
        System.out.println(productRepositor.existsByBarcodeg(product.getBarcodeg()) +" non so");
        try {
            productService.addProduct(product);
            System.out.println("Prodotto creato");
        } catch (BarCodeAlreadyExistException e) {

            System.out.println("Prodotto non creato");
            return new ResponseEntity<>("Barcode already exi st!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Added successful!"), HttpStatus.OK);
    }

    @RolesAllowed("backend-admin")
    @GetMapping("/allProducts)")
    public List<Product> getAll() {

        return productService.showAllProducts();
    }

    /*
    The "Search" function performs a search within the database and returns all products that contain the string that the user writes
     */
    @RolesAllowed("backend-user")
    @GetMapping("/search/{name}")
    public List<Product> getByName(@PathVariable("name") String name) {
        System.out.println(name);
        List<Product> result = productRepositor.findByNameContaining(name);
        System.out.println("Result "+result);
        return result;
    }


//    @RolesAllowed("backend-admin")
//    @PutMapping("/update/{id}")
//    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Product prod) {
//        Product ProductUpdate = productService.findById(id);
//        Objects.requireNonNull(productRepository);
//        ProductUpdate.setName(prod.getName());
//        ProductUpdate.setPrice(prod.getPrice());
//        ProductUpdate.setQuantity(prod.getQuantity());
//        ProductUpdate.setDescription(prod.getDescription());
//        return new ResponseEntity("fatto", HttpStatus.OK);
//    }
//
    /*
    The "delete" function, has the function of eliminating a product within the product table
     */
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        Product pro=productRepositor.findById(id);
        System.out.println(pro);
        productRepositor.delete(pro);


    }
    /*
    The "expand" function, has the function of expanding the product on another page, showing more information about it
    and allowing those with an admin role to be able to change the quantity
     */
    @RolesAllowed("backend-user")
    @GetMapping("/expand/{id}")
    public ResponseEntity<Product> expand(@PathVariable("id") int id){
        Product pro=productRepositor.findById(id);
        return new ResponseEntity(pro, HttpStatus.OK);
    }


    @GetMapping("/get/{id}")
    public ResponseEntity get(@PathVariable("id")  int id) throws BarCodeAlreadyExistException {
        System.out.println(id);
        Product result = productRepositor.findById(id);
        Product product=new Product();
        product=result;
        if(product.getQuantity()>0) {
            System.out.println("sono il prodotto nuovo  " + product);
            productRepositor.delete(result);
            System.out.println("la quantità prima era di " + result.getQuantity());

            product.setQuantity(product.getQuantity() - 1);
            System.out.println("la quantità adesso è di " + result.getQuantity());
            productService.addProduct(product);
        }


        return new ResponseEntity<>(result, HttpStatus.OK);
    }



    /*
    The ChangeQuantity function, allows those with an admin role to be able to change the quantity within the specific product page
     */
    @PostMapping("/expand/{id}/change/{quantity}")
    public void changeQuantity(@PathVariable("id") int id,@PathVariable("quantity") int quantity) {
        System.out.println("arrivo qui e ho id"+id+" e ho quantità "+quantity);
        System.out.println(productRepositor.findById(id));
        productRepositor.findById(id).setQuantity(quantity);
        productRepositor.save(productRepositor.findById(id));
        System.out.println(productRepositor.findById(id));

    }




    @GetMapping("/getB/{barcodeg}")
    public ResponseEntity getByBarcode(@PathVariable("barcodeg")  String barcodeg) throws BarCodeAlreadyExistException {
        System.out.println(barcodeg);
        Product result = productRepositor.findByBarcodeg(barcodeg);
        System.out.println("il risultato è   "+result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }





}



