import { Component } from '@angular/core';
import { Produit } from '../models/produit';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent {
  products!: Produit[];

  constructor() {}

  ngOnInit() {
    const p : Produit = {
      id:"oui",
      code:"oui",
      name:"oui",
      description:"oui",
      price:30,
      quantity:2,
      inventoryStatus:"OK",
      category:"stri",
      image:"string",
      rating:1,
    };
    this.products = [p,p,p,p,p,p,p,p,p,p]
  }
}
