import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import {MessagesModule} from 'primeng/messages';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputNumberModule} from 'primeng/inputnumber';
import {PasswordModule} from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HomeComponent } from './pages/home/home.component';
import { PresentationsComponent } from './pages/presentations/presentations.component';
import { PresentationDetailComponent } from './pages/presentation-detail/presentation-detail.component';
import {AccordionModule} from 'primeng/accordion';
import { PanierComponent } from './pages/panier/panier.component';
import { PanierService } from './services/panier.service';
import {CommandesComponent} from "./pages/Commandes/commandes.component";
import {OrderListModule} from "primeng/orderlist";


@NgModule({
  providers: [MessageService, PanierService],
  declarations: [
    AppComponent,
    ConnexionComponent,
    AdminComponent,
    HomeComponent,
    PresentationsComponent,
    PresentationDetailComponent,
    PanierComponent,
    CommandesComponent
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
    PaginatorModule,
    MessageModule,
    BrowserModule,
    BrowserAnimationsModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    InputNumberModule,
    FormsModule,
    AccordionModule,
    PasswordModule,
    ToastModule,
    OrderListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
