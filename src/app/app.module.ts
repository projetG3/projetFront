import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProduitsComponent } from './pages/produits/produits.component';

import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { ProductService } from './services/produits/productervice.ts.service';
import {PaginatorModule} from 'primeng/paginator';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AdminComponent,
    HomeComponent,
    ProduitsComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HttpClientModule,
    VirtualScrollerModule,
    PaginatorModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
