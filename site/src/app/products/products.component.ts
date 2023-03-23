import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Checkout } from '../checkout';
import { Products } from '../products';
import { ProductsService } from '../products.service';
import { KeycloakProfile,KeycloakRoles } from 'keycloak-js';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product? :Products;
  public loggato = false;
  public idPersonale: string | undefined;
  public profilo: KeycloakProfile | null = null
  ProductName?: string;
  retrievedImage: any;
  barCode?: string;
  description?: string;
  base64Data: any;
retrieveResonse: any;
  price?: number;
  quantity?: number;
  barcodeg?: string;
  image?: string;
  products: any;
  newQuantity:any;
  Snproduct?: Checkout;
  Sproduct: any;
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};
  public ruoliU: string[] |undefined;
  public isAdmin= false;
  lista: Products[] = [];
  constructor(private service: ProductsService,private httpClient: HttpClient,private keycloakService: KeycloakService) {
    this.ruoliU=this.keycloakService.getKeycloakInstance().realmAccess?.roles;
    if(this.ruoliU?.includes('psw-admin')){
      this.isAdmin=true;
    };
   }

   public async ngOnInit() {
    
    this.loggato = await this.keycloakService.isLoggedIn();
    console.log(this.loggato)
    if (this.loggato) {
  
      this.profilo = await this.keycloakService.loadUserProfile();
      console.log(this.profilo.id); 
      this.idPersonale=this.profilo.id;
    }
    this.iter();
    
    
  
    
  }



  public deleteIm(name: String): Observable<any> {
    return this.httpClient.delete<any>("http://localhost:8081/image" + `/delete/${name}`, this.httpOptions);
  }

iter():void{

  this.service.list().subscribe(data=>{
    this.products=data;
    console.log(this.products.name)
  

  },
  
  
    err => console.log(err)
        );


}

print(nw: any){
  console.log(nw);

}

getImage(String: any ) {
  //Make a call to Spring Boot to get the Image Bytes.
  
  this.httpClient.get('http://localhost:8081/image/get/'+String)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picbyte;
        

        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        console.log(this.retrievedImage)



      }
    );
}





getSP(id: number):void {
  console.log(id)
  this.service.getProduct(id).subscribe(data=>{
    this.Sproduct=data;
    console.log(this.Sproduct.quantity)
    
    if(this.Sproduct.quantity>=0){
      console.log(this.profilo?.id)
    this.Snproduct=new Checkout(undefined,this.Sproduct.name,this.Sproduct.bar_code,this.Sproduct.description,this.Sproduct.price,1,this.Sproduct.barcodeg,this.Sproduct.image,this.profilo?.id);
    
    console.log(this.Snproduct)

    this.service.crech1(this.Snproduct).subscribe(
      data => {
      },
      err => console.log(err)
    );
    }else if(this.Sproduct.quantity<=-1){
      console.log("Non è disponibile")
      
    }
  },
  err=> console.log(err));
  window.setTimeout(function(){location.reload()},2000)


  


 


  
}






onDelete(id: number,image:String): void {
  this.service.delete(id).subscribe(
    data => {
      console.log(data);
      this.iter();
    },
    err => console.log(err)
  );
  
  window.setTimeout(function(){location.reload()},2000)

}

}
