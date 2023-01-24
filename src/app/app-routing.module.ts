import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './services/auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
