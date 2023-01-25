import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DoveSiamoComponent } from './dove-siamo/dove-siamo.component';
import { OfferteComponent } from './offerte/offerte.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { BicicletteComponent } from './biciclette/biciclette.component';
import { MonopattiniComponent } from './monopattini/monopattini.component';
import { BicicletteElettricheComponent } from './biciclette-elettriche/biciclette-elettriche.component';
import { BiciclettePedaliComponent } from './biciclette-pedali/biciclette-pedali.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'prodotti', component: ProdottiComponent},
  {path: 'doveSiamo',component: DoveSiamoComponent},
  {path: 'chiSiamo',component: ChiSiamoComponent},
  {path: 'offerte',component: OfferteComponent},
  {path: 'biciclette/biciclette-elettriche', component: BicicletteElettricheComponent},
  {path: 'monopattini',component: MonopattiniComponent},
  {path: 'biciclette',component: BicicletteComponent},
  {path: 'biciclette/biciclette-pedali',component: BiciclettePedaliComponent},
  {path: '', component: HomeComponent},
  {path: '**',redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
