import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private oauthService:OAuthService,
    private router: Router  
    
    ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var hasIdToken=this.oauthService.hasValidIdToken();
      var hasAccessToken = this.oauthService.hasValidAccessToken();
    if(hasIdToken && hasAccessToken){
      return true;
    }
      else{
       
        return false;
      }
    
  }
  
}
