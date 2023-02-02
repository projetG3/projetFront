import { PresentationDetailComponent } from './pages/presentation-detail/presentation-detail.component';
import { Presentation } from './models/presentation';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HomeComponent } from './pages/home/home.component';
import { PanierComponent } from './pages/panier/panier.component';
import { PresentationsComponent } from './pages/presentations/presentations.component';
import {CommandesComponent} from "./pages/Commandes/commandes.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'presentations', component: PresentationsComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'presentation/:id', component: PresentationDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
