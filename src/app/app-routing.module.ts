import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionComponent } from './connexion/connexion.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { PanierComponent } from './panier/panier.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'panier', component: PanierComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
