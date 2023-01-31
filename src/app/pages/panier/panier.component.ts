import { Commande } from 'src/app/models/commande';

import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  panier!: Commande | undefined;
  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.panierService.panier$.subscribe((panier: Commande | undefined) => (this.panier = panier));
    console.log(this.panierService.panier);
    this.panier = this.panierService.panier;
    const panierFromLocalStorage = localStorage.getItem('panier');
    if (panierFromLocalStorage !== null) {
      this.panier = JSON.parse(panierFromLocalStorage);
    }

  }

  getTotal():number{
    let total=0
    if(this.panier){
      this.panier.estconstitueedes.forEach((estconstitueede) => total += (estconstitueede.quantite * estconstitueede.presentation.prix)  )
      return total;
    }
    return -1;
  }

}
