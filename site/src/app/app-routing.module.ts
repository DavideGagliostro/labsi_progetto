import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoveSiamoComponent } from './dove-siamo/dove-siamo.component';

/*
import { OfferteComponent } from './offerte/offerte.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { BicicletteComponent } from './biciclette/biciclette.component';
import { MonopattiniComponent } from './monopattini/monopattini.component';
import { BicicletteElettricheComponent } from './biciclette-elettriche/biciclette-elettriche.component';
import { BiciclettePedaliComponent } from './biciclette-pedali/biciclette-pedali.component';
*/
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { HomeComponent } from './home/home.component';
import { KeycloakGuard } from './keycloak.guard';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CreateComponent } from './products/create/create.component';
import { UpdateComponent } from './products/update/update.component';
import { ExpandComponent } from './products/expand/expand.component';
import { CartComponent } from './cart/cart.component';
import { ImageComponent } from './image/image.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SearchComponent } from './products/search/search.component';
import { OrderComponent} from './login/order/order.component'

const routes: Routes = [
  {path: 'doveSiamo',component: DoveSiamoComponent},
  {path: 'chiSiamo',component: ChiSiamoComponent},
  {path: 'products',component: ProductsComponent},
  {path: 'create', component: CreateComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [KeycloakGuard] },

  {path: 'expand/:id', component: ExpandComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'expand', component: ExpandComponent},
  {path: 'search/:name', component: SearchComponent},
  {path: 'search', component: SearchComponent},
  {path: 'order/:id', component: OrderComponent},
  {path: 'image', component: ImageComponent},

  {path: 'update/:id', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
