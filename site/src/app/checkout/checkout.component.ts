import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { delay, Observable } from 'rxjs';
import { Checkout } from '../checkout';
import { Products } from '../products';
import { ProductsService } from '../products.service';
import { KeycloakProfile,KeycloakRoles } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: any;
  api= "http://localhost:8081/checkout";
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};



  barCode?: string;
  nameproduct?: string;
  price?: number;
  quantity?: number;
  Sproduct: any;

   public profilo: KeycloakProfile | null = null
  public email: string | undefined;
  Snproduct?: Products;
  Cartproduct: any;
  public loggato = false;
  newQuantity: any;
  Listproduct: any;


  constructor( private keycloakService: KeycloakService,   private router: Router,
    private service: ProductsService,private http: HttpClient) { 

      this.keycloakService.getToken().then(token => {
        console.log('token', token);
        // this.tokenView=token;
        
      })
    }

    
  volver(): void {
    this.router.navigate(['/products']);
  }

  public async ngOnInit() {
    
    this.loggato = await this.keycloakService.isLoggedIn();
    if (this.loggato) {
  
      this.profilo = await this.keycloakService.loadUserProfile();
      console.log(this.profilo); 
      this.email=this.profilo.id;
      console.log(this.email)
    }
    this.getAllUser(this.email).subscribe(data=>{
      this.products=data;
    },
    
    
      err => console.log(err)
          );
  ;
  }


  public getAll(): Observable<String[]>{
    return this.http.get<String[]>(this.api+'/list',this.httpOptions);
  }

  changeQ(quantity: any){
    
  }


  public getAllUser(id: string |undefined): Observable<String[]>{
    return this.http.get<String[]>(this.api+`/list/${id}`,this.httpOptions);
  }
  

  public closeOrderUser(id: string |undefined): Observable<any>{
    return this.http.get<any>(this.api+`/complete/${id}`,this.httpOptions);
  }
  


  public closeOrder():  Observable<any> {
      return this.http.get<any>(this.api + `/complete`,this.httpOptions)
    
  
  }

  getSP(id: number):void {
    console.log(id)
    this.service.getProduct(id).subscribe(data=>{
      this.Sproduct=data;
      console.log(this.Sproduct.quantity)
      
      if(this.Sproduct.quantity>0){
        console.log(this.profilo?.id)
      this.Snproduct=new Checkout(undefined,this.Sproduct.name,this.Sproduct.bar_code,this.Sproduct.description,this.Sproduct.price,1,this.Sproduct.barcodeg,this.Sproduct.image,this.profilo?.id);
      
      console.log(this.Snproduct)
  
      this.service.crech1(this.Snproduct).subscribe(
        data => {
        },
        err => console.log(err)
      );
      }else if(this.Sproduct.quantity==0){
        console.log("Non è disponibile")
        
      }
    },
    err=> console.log(err));
    window.setTimeout(function(){location.reload()},2000)
  }






  complete(): void{

    this.closeOrderUser(this.email).subscribe(
      data => {
        console.log(data);
        alert("Ordine completato! Lo troverai nello storico ordini" );  

      },
      
      err => {
        alert("Non può essere vuoto" );  
        console.log(err)
      }
      

    );  window.setTimeout(function(){location.reload()},2000)

  }



  onDelete(id: number): void {
    this.delete(id).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );  window.setTimeout(function(){location.reload()},1000)

  }


  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + `/delete/${id}`, this.httpOptions);
  }

  public change(id: number): Observable<String>{
    return this.http.get<String>(this.api + `/change`,this.httpOptions)
  }  



  public getCartProduct(id: number): Observable<String>{
    return this.http.get<String>(this.api + `/getC/${id}`,this.httpOptions)
  }  


  rmFC(id: number){
    this.removeFromCart(id).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    ); window.setTimeout(function(){location.reload()},1000)
  }


  public removeFromCart(id: number): Observable<any>{
    return this.http.get<any>(this.api + `/rm/${id}`,this.httpOptions)
  }  

  
  incr(id: number){
    this.increment(id).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    ); window.setTimeout(function(){location.reload()},1000)
  }

  public increment(id: number): Observable<any>{
    return this.http.get<any>(this.api + `/increment/${id}`,this.httpOptions)
  }  

  
  decr(id: number){
    this.decrement(id).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    ); window.setTimeout(function(){location.reload()},1000)
  }
  
  public decrement(id: number): Observable<any>{
    return this.http.get<any>(this.api + `/decrement/${id}`,this.httpOptions)
  }  
  
  


  onCreate(Snproduct:Products){
    this.service.create(Snproduct).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  }
  
  
}







