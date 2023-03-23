import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkout } from 'src/app/checkout';
import { Products } from 'src/app/products';
import { ProductsService } from 'src/app/products.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile,KeycloakRoles } from 'keycloak-js';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.css']
})
export class ExpandComponent implements OnInit {
  public ruoliU: string[] |undefined;
  public isAdmin= false;
  product? :Products;

products!:Products;
constructor(
  private productService: ProductsService,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private httpClient: HttpClient,
  private keycloakService: KeycloakService,
  private service: ProductsService
) { 
  this.ruoliU=this.keycloakService.getKeycloakInstance().realmAccess?.roles;
    if(this.ruoliU?.includes('psw-admin')){
      this.isAdmin=true;
    };
}


selectedFile!: File;
retrievedImage: any;
base64Data: any;
newQuantity:any;
public loggato = false;
public idPersonale: string | undefined;
public profilo: KeycloakProfile | null = null
retrieveResonse: any;
message!: string;
imageName: any;
Snproduct?: Checkout;
Sproduct: any;
httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};


volver(): void {
  this.router.navigate(['/products']);
}
print(nw: any){
  console.log(nw);

}

getSP(id: number |undefined):void {
  console.log(id)
  this.service.getProductU(id).subscribe(data=>{
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

  this.router.navigate(['/products']);


  


 


  
}

//MODIFICARE
//qua devo modificare e mettere che mando anche  l'id user e poi faccio il constrollo edirettamente nel server 
// getSP(id: number|undefined):void {
//   console.log(id)
//   this.service.getProductUn(id).subscribe(data=>{
//     this.Sproduct=data;
//     console.log(this.Sproduct)
//     if(this.Sproduct.quantity>0){
//     this.Snproduct=new Checkout(undefined,this.Sproduct.name,this.Sproduct.bar_code,this.Sproduct.description,this.Sproduct.price,1,this.Sproduct.barcodeg,this.Sproduct.image);

//     console.log(this.Snproduct)

//     this.service.crech(this.Snproduct).subscribe(
//       data => {
//       },
//       err => console.log(err)
//     );
//   }else if(this.Sproduct.quantity==0){
//     console.log("Non è disponibile")
    
//   }
//   },
//   err=> console.log(err));
//   window.setTimeout(function(){location.reload()},2000)
// }

getImage(String: any ) {
  //Make a call to Sprinf Boot to get the Image Bytes.
  console.log(this.imageName)
  this.httpClient.get('http://localhost:8081/image/get/'+String)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picbyte;
        console.log(this.imageName)

        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        console.log(this.retrievedImage)



      }
    );
}







changeQ(numb: any){
  const id = this.activatedRoute.snapshot.params['id'];

  this.productService.changeQuantity(id,numb).subscribe(
    data => {
    },
    err => console.log(err)
  );

}







  async ngOnInit(): Promise<void> {
  this.loggato = await this.keycloakService.isLoggedIn();
  console.log(this.loggato)
  if (this.loggato) {

    this.profilo = await this.keycloakService.loadUserProfile();
    console.log(this.profilo.id); 
    this.idPersonale=this.profilo.id;
  }

  const id = this.activatedRoute.snapshot.params['id'];

  
  this.productService.expand(id).subscribe(
    data => {
      this.products = data;
      this.getImage(this.products.image);
      console.log(this.products.name)

    },
    err => console.log(err)
  );



  


}




back(): void {
  this.router.navigate(['/products']);
}

}