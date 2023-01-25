import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  title = 'prova1';
  public loggato= false;
  
  
  public pu: KeycloakProfile | null= null;

  constructor(private readonly Keycloak:KeycloakService){}


  public async ngOnInit() {
    this.loggato= await this.Keycloak.isLoggedIn();
    type ruolo=Array<{id:number,text: string}>;
    if(this.loggato){
      this.pu=await this.Keycloak.loadUserProfile();
      
    }
  }
  

  public lon(){
    this.Keycloak.login();
  }

  public lout(){
    this.Keycloak.logout();
  }
}
