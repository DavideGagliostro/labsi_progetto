import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Products } from '../products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public ruoliU: string[] |undefined;
  public isAdmin= false;
  constructor(private keycloakService: KeycloakService,private http: HttpClient) { 
    this.ruoliU=this.keycloakService.getKeycloakInstance().realmAccess?.roles;
      if(this.ruoliU?.includes('psw-admin')){
        this.isAdmin=true;
      };
  }
  nome:any;

 api= "http://localhost:8081/products";
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};
    
    
  products: any;



  ngOnInit(): void {

    
    
    
  
    
  }

  search(name: String){
    this.searchP(name).subscribe(
      data => {
        this.products=data;
        console.log(this.products.name)
      
    
      },
      
      
        err => console.log(err)
            );
  }


  public searchP(name: String): Observable<Products[]> {
    return this.http.get<Products[]>(this.api + `/search/${name}`, this.httpOptions);
  }

}