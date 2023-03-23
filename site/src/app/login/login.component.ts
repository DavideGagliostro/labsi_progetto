import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile,KeycloakRoles } from 'keycloak-js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  historyP: any;
  api= "http://localhost:8081/history";
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};
  public loggato = false;
  public isAdmin= false;
  public tokenView="";
  public profilo: KeycloakProfile | null = null
  public nome: string | undefined;
  public cognome: string | undefined;
  public mail: string | undefined;
  public mailVerificata: boolean | undefined;
  public abilitato: boolean | undefined;
  public idPersonale: string | undefined;
  public ruoliU: string[] |undefined;
  constructor(private keycloakService: KeycloakService,private http: HttpClient) { 
    this.keycloakService.getToken().then(token => {
      console.log('token', token);
      this.tokenView=token;
      
    })
    console.log(this.keycloakService.getKeycloakInstance().realmAccess?.roles);
      this.ruoliU=this.keycloakService.getKeycloakInstance().realmAccess?.roles;
      if(this.ruoliU?.includes('psw-admin')){
        this.isAdmin=true;
      };
    
  }
  public async ngOnInit() {

    this.loggato = await this.keycloakService.isLoggedIn();
    type rolesUsuarios = Array<{id: number, text: string}>;

    if (this.loggato) {
  
      this.profilo = await this.keycloakService.loadUserProfile();
      console.log(this.profilo); 
      this.nome=this.profilo.firstName;
      this.cognome=this.profilo.lastName;
      this.mail=this.profilo.email;
      this.mailVerificata=this.profilo.emailVerified;
      this.abilitato=this.profilo.enabled;
      this.idPersonale=this.profilo.id;
    }
  }

  public firstName () : string | undefined{
    return this.nome;
  }
  public admin () : boolean {
    return this.isAdmin;
  }

  public lastName () : string | undefined{
    return this.cognome;
  }

  public email () : string | undefined{
    return this.mail;
  }

  public id () : string | undefined{
    return this.idPersonale;
  }

  public enabled () : boolean | undefined{
    return this.abilitato;
  }

  public emailVerified () : boolean| undefined{
    return this.mailVerificata;
  }





  
  public username () : string {
    return this.keycloakService.getUsername()
  }

  public token () : string {
    return this.tokenView;
  }


  public admOrUsr(): string[] | undefined{
    return this.ruoliU;
  }
  
  public ruoli(): string[]{
    return this.keycloakService.getUserRoles();
  }

  public logout () {
    this.keycloakService.logout('http://localhost:4200/home');
    
  }





  public getAllUser(id: string |undefined): Observable<String[]>{
    return this.http.get<String[]>(this.api+`/list/${id}`,this.httpOptions);
  }


  order(){
    // console.log(this.mail)
    this.getAllUser(this.idPersonale).subscribe(data=>{
      this.historyP=data;
    },
    
    
      err => console.log(err)
          );
  ;
  }
  


}