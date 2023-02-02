import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HomeComponent } from './pages/home/home.component';
import { PanierComponent } from './pages/panier/panier.component';
import { PresentationDetailComponent } from './pages/presentation-detail/presentation-detail.component';
import { PresentationsComponent } from './pages/presentations/presentations.component';
import { PanierService } from './services/panier.service';

@NgModule({
  providers: [MessageService, PanierService],
  declarations: [
    AppComponent,
    ConnexionComponent,
    HomeComponent,
    PresentationsComponent,
    PresentationDetailComponent,
    PanierComponent,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
