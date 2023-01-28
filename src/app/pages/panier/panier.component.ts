import { Commande } from './../../models/commande';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  panier!: Commande;
  ngOnInit(): void {
    const panier = localStorage.getItem('panier');
    if (panier != null) {
      this.panier = JSON.parse(panier);
    }
  }
}
