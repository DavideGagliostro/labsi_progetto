package com.example.piattaforme_progetto.controller.rest;

import com.example.piattaforme_progetto.Repository.CheckoutRepository;
import com.example.piattaforme_progetto.Repository.HistoryRepository;
import com.example.piattaforme_progetto.Repository.ProductRepository;
import com.example.piattaforme_progetto.Service.AllorderService;
import com.example.piattaforme_progetto.Service.CheckoutService;
import com.example.piattaforme_progetto.Service.HistoryService;
import com.example.piattaforme_progetto.Service.ProductService;
import com.example.piattaforme_progetto.Support.ResponseMessage;
import com.example.piattaforme_progetto.Support.exceptions.BarCodeAlreadyExistException;
import com.example.piattaforme_progetto.entity.Allorder;
import com.example.piattaforme_progetto.entity.Checkout;
import com.example.piattaforme_progetto.entity.History;
import com.example.piattaforme_progetto.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/checkout")

@CrossOrigin("*")
public class CheckoutController {
    @Autowired
    private CheckoutService checkoutService;
    @Autowired
    private HistoryService historyService;

    @Autowired
    private ProductService productService;

    @Autowired
    private AllorderService allorderService;


    private CheckoutRepository checkoutRepositor;
    private HistoryRepository historyRepositor;
    private ProductRepository productRepositor;

    public CheckoutController(CheckoutRepository checkoutRepository,ProductRepository productRepositor, HistoryRepository historyRepositor) {
        this.checkoutRepositor = checkoutRepository;
        this.historyRepositor=historyRepositor;
        this.productRepositor=productRepositor;
    }


    //restituisce la list di tutti i prodotti contenuti nel carrello
    @GetMapping("/list")
    public List<Checkout> list() {
        System.out.println(checkoutService.showAllProducts().get(1).getPrice());
        return checkoutService.showAllProducts();
//                ResponseEntity(productss, HttpStatus.OK);
    }


    //restituisce la list di tutti i prodotti contenuti nel carrello dell'utente {id}
    @GetMapping("/list/{id}")
    public List<Checkout> listUser(@PathVariable("id") String id) {
        List<Checkout> listReturn=new ArrayList<>();
        List<Checkout> listWU=checkoutService.showAllProducts();
        System.out.println(id);



        for(Checkout check:listWU){
            if(check.getIduser().equals(id)){
                listReturn.add(check);
            }
        }

        return listReturn;
        //return checkoutService.showAllProducts();
//                ResponseEntity(productss, HttpStatus.OK);
    }

  /*
    The process of creating a product involves a prior check of the availability of the required quantity in the warehouse.
    If the quantity available in the warehouse is greater than or equal to zero, two cases can occur:

    1. If the quantity in the warehouse is zero, the product is still created, but the quantity is set to a dummy number
       indicating the unavailability of the product.

    2. The second case occurs when the quantity in the warehouse is greater than zero. In this case, two further sub-cases can occur:
        2.1. When the product is not yet in the cart, the product is added to the cart with the quantity requested by the customer.
        2.2. When the product is already in the cart, the quantity of the product is increased by one, updating the quantity in the cart.

*/
    @PostMapping("/create")
    public ResponseEntity create(@RequestBody @Valid Checkout product) {

        try {
        if(productRepositor.findByBarcodeg(product.getBarcodeg()).getQuantity()>=0) {
            if(productRepositor.findByBarcodeg(product.getBarcodeg()).getQuantity()==0){
                productRepositor.findByBarcodeg(product.getBarcodeg()).setQuantity(-1);
                productRepositor.save(productRepositor.findByBarcodeg(product.getBarcodeg()));
            }

            if (checkoutRepositor.findByBarcodeg(product.getBarcodeg()) == null) {
                checkoutService.addCheckout(product);
                System.out.println(product);
                System.out.println("prodotto nuovo");
            } else {
                System.out.println("prodotto gia esistente");
                Checkout cn = new Checkout();
                cn = product;
                System.out.println(checkoutRepositor.findByBarcodeg(product.getBarcodeg()));
                for (Checkout c : checkoutRepositor.findByBarcodeg(product.getBarcodeg())) {
                    System.out.println(c.getIduser().equals(product.getIduser()));
                    if (c.getIduser().equals(product.getIduser())) {
                        checkoutRepositor.delete(c);
                        cn.setQuantity(c.getQuantity() + 1);

                    }
                }

//
//                cn.setQuantity(checkoutRepositor.findByBarcodeg(product.getBarcodeg()).getQuantity()+1);
//                checkoutRepositor.delete(checkoutRepositor.findByBarcodeg(product.getBarcodeg()));
                checkoutService.addCheckout(cn);

            }
        }
        } catch (BarCodeAlreadyExistException e) {
            return new ResponseEntity<>("Barcode already exi st!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Added successful!"), HttpStatus.OK);
    }


    /*
    The removeFromCart function removes a product from the cart and, in doing so, re-inserts it into the list of available
    products in the warehouse. Depending on the circumstances, this process can occur according to two distinct scenarios:
    1. When the quantity of a given product in the warehouse is equal to -1 (a dummy number used to indicate that the product is out of stock).
       In this case, the function inserts into the warehouse list the quantity of the product that is currently in the cart,
       increasing it by a value equal to the opposite of the dummy number used (in this case, 1).
    2. When the quantity of the product in the warehouse is different from -1. In this case, the function simply inserts
       into the warehouse list the quantity of the product that is in the cart.
     */
    @GetMapping("/rm/{id}")
    public void removeFromCart(@PathVariable("id") int id) {
        System.out.println("arrivo qui");
        Checkout c=checkoutRepositor.findById(id);
        if(productRepositor.findByBarcodeg(c.getBarcodeg()).getQuantity()==-1){
            productRepositor.findByBarcodeg(c.getBarcodeg()).setQuantity(productRepositor.findByBarcodeg(c.getBarcodeg()).getQuantity()+c.getQuantity()+1);
        }
        productRepositor.findByBarcodeg(c.getBarcodeg()).setQuantity(productRepositor.findByBarcodeg(c.getBarcodeg()).getQuantity()+c.getQuantity());
        checkoutRepositor.delete(c);
    }

   /*
   The increment function increments the quantity of a product in the cart, taking its ID as a parameter.
   In this case, the function performs a check to verify if the current quantity of the product in the cart is greater than 0.
   If it is, the function increments and updates the product accordingly.
    */
    @GetMapping("/increment/{id}")
    public void updateAddProduct(@PathVariable("id") int id) {
        System.out.println("arrivo qui");
        if (productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).getQuantity() > 0) {
            checkoutRepositor.findById(id).setQuantity(checkoutRepositor.findById(id).getQuantity() + 1);
            productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).setQuantity(productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).getQuantity() - 1);
            productRepositor.save(productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()));
            checkoutRepositor.save(checkoutRepositor.findById(id));
        }
    }


    /*
    1. If the quantity of the product in the cart is equal to 1, then decrementing the product results in removing it from
    the cart and incrementing the quantity of the product in the warehouse by 1.

    2. If the quantity of the product in the cart is equal to -1 (a fictitious number used to indicate the absence of the
    product in the cart), then decrementing the product results in adding the quantity of the product in the cart to the
    quantity of the product in the warehouse and incrementing the quantity of the product in the warehouse by 1.

    3.In all other cases, decrementing the product results in setting the new quantity of the product in both the cart
    and the warehouse, in order to reflect the numerical decrease in the quantity of the product.
     */
    @GetMapping("/decrement/{id}")
    public void updateRemProduct(@PathVariable("id") int id) {
        if (checkoutRepositor.findById(id).getQuantity() == 1) {
            Checkout c = checkoutRepositor.findById(id);
            checkoutRepositor.findById(id).setQuantity(checkoutRepositor.findById(id).getQuantity() - 1);
            productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).setQuantity(productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).getQuantity() + 1);
            productRepositor.save(productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()));
            checkoutRepositor.save(checkoutRepositor.findById(id));
            checkoutRepositor.delete(checkoutRepositor.findById(id));


        }
        if (productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).getQuantity() == -1) {
            checkoutRepositor.findById(id).setQuantity(checkoutRepositor.findById(id).getQuantity() - 1);

            productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).setQuantity(1);
            productRepositor.save(productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()));
            checkoutRepositor.save(checkoutRepositor.findById(id));
        } else {
            checkoutRepositor.findById(id).setQuantity(checkoutRepositor.findById(id).getQuantity() - 1);
            productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).setQuantity(productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()).getQuantity() + 1);
            productRepositor.save(productRepositor.findByBarcodeg(checkoutRepositor.findById(id).getBarcodeg()));
            checkoutRepositor.save(checkoutRepositor.findById(id));

        }

    }





//    @PostMapping("/{barcodeg}/change/{quantity}")
//    public void changeQuantity(@PathVariable("barcodeg") String barcodeg,@PathVariable("quantity") int quantity) {
//
//        System.out.println(productRepositor.findByBarcodeg(barcodeg));
//        if(productRepositor.findByBarcodeg(barcodeg).getQuantity()+checkoutRepositor.findByBarcodeg(barcodeg)>=quantity){
//            productRepositor.findByBarcodeg(barcodeg).setQuantity(productRepositor.findByBarcodeg(barcodeg).getQuantity()-quantity);
//        }
//        productRepositor.save(productRepositor.findByBarcodeg(barcodeg));
//
//    }




    @GetMapping("/allProducts)")
    public List<Checkout> getAll() {

        return checkoutService.showAllProducts();
    }


    /*
    closeOrder completes the order inside the cart, generating a unique code that will be the identifying code of
    the order (the code is unique because we use a function that verifies the non-repetition of the code).
    Next, the total of the order is created within a new variable called "order" where the parameters are set and
    added to the "allorder" database, removing all items from the user's cart with ID {id}.
    Finally, the same process is done for the order history.
     */
    @GetMapping("/complete/{id}")
    public void closeOrder(@PathVariable("id") String id) {
        //quando arrivo qua, creo una nuova history, dove al nome metto il numero di ordine
        //barcodeg non metto niente,
        //price metto prezzo totale
        //quantity metto il numero totale degli elementi
        //iduser metto l'id user

        //il numero di ordine lo uso anche nell'altra table
        int n=(int)Math.floor(Math.random() * (99999 - 00000) + 00000);
        String nOrd="#"+n;
        //controllo che il numero non esista
        String nOrdine=verifica(nOrd);




        //adesso faccio la somma dei prodotti che l'utente con id {id} ha nel carrello
        List<Checkout> listWU=checkoutService.showAllProducts();
        float allPrice=0;
        int allQuantity=0;

        for(Checkout c:listWU){
            if(c.getIduser().equals(id)) {
                //sono nel carrello dell'utente con id {id}
                System.out.println(c);
                allPrice = allPrice + c.getPrice()*c.getQuantity();
                allQuantity = allQuantity + c.getQuantity();
                Allorder order=new Allorder();
                order.setIdorder(nOrdine);
                order.setPrice(c.getPrice());
                order.setName(c.getName());
                order.setBarcodeg(c.getBarcodeg());
                order.setQuantity(c.getQuantity());
                //qua metto direttamente order con tutte le cose senza fare set
                allorderService.addOrder(order);


                checkoutRepositor.delete(c);
            }
        }

        History h=new History();
        h.setName(nOrdine);
        h.setPrice(allPrice);
        h.setQuantity(allQuantity);
        h.setIduser(id);
        System.out.println(h);
        try {
            historyService.addHistory(h);
        } catch (BarCodeAlreadyExistException e) {
            throw new RuntimeException(e);
        }
    }


    public String verifica(String nOrdine){
        List<History> listWU=historyService.showAllProducts();
        for(History h: listWU) {
            //devo mandare l'id, se l'id è uguale prendo prezzo/quantità ed infine cancello il prodotto dal carrello
            if (h.getName().equals(nOrdine)) {
                int n=(int)Math.floor(Math.random() * (99999 - 00000) + 00000);
                nOrdine="#"+n;
                verifica(nOrdine);
            }
        }
        return nOrdine;
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
