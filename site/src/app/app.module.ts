import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DoveSiamoComponent } from './dove-siamo/dove-siamo.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';


import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list'
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { CreateComponent } from './products/create/create.component';
import { UpdateComponent } from './products/update/update.component';
import { ExpandComponent } from './products/expand/expand.component';
import { CartComponent } from './cart/cart.component';
import { BohComponent } from './boh/boh.component';
import { ImageComponent } from './image/image.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SearchComponent } from './products/search/search.component';
import { OrderComponent } from './login/order/order.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'labsi',
        clientId: 'labsi-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      loadUserProfileAtStartUp: true
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoveSiamoComponent,
    HeaderComponent,
    ChiSiamoComponent,
    HomeComponent,
    ProductsComponent,
    CreateComponent,
    UpdateComponent,
    ExpandComponent,
    CartComponent,
    BohComponent,
    ImageComponent,
    CheckoutComponent,
    SearchComponent,
    OrderComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }