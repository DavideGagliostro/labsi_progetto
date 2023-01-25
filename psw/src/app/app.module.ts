import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DoveSiamoComponent } from './dove-siamo/dove-siamo.component';
import { OfferteComponent } from './offerte/offerte.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { BicicletteComponent } from './biciclette/biciclette.component';
import { MonopattiniComponent } from './monopattini/monopattini.component';
import { BicicletteElettricheComponent } from './biciclette-elettriche/biciclette-elettriche.component';
import { BiciclettePedaliComponent } from './biciclette-pedali/biciclette-pedali.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthConfigModule } from './auth/auth-config.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    DoveSiamoComponent,
    OfferteComponent,
    ProdottiComponent,
    BicicletteComponent,
    MonopattiniComponent,
    BicicletteElettricheComponent,
    BiciclettePedaliComponent,
    ChiSiamoComponent
  ],
  imports: [
    BrowserModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    AuthConfigModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
