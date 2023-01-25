import { Component } from '@angular/core';
import { OAuthService, AuthConfig, NullValidationHandler } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
    export const authCodeFlowConfig: AuthConfig ={
      //qui devo mettere l'url
      issuer: environment.keycloak.issuer,

      redirectUri:environment.keycloak.redirectUri,
      clientId:environment.keycloak.clientId,
      responseType:'code',
      scope: environment.keycloak.scope,
      showDebugInformation:true,
    }

  
