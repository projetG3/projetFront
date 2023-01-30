import { PanierService } from '../services/panier/panier.service';
import { Presentation } from '../models/presentation';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresentationService } from '../services/presentation/presentation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-presentation-detail',
  templateUrl: './presentation-detail.component.html',
  styleUrls: ['./presentation-detail.component.css'],
})
export class PresentationDetailComponent {
  id: any;
  presentation!: Presentation;
  message!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private presentationService: PresentationService,
    private panierService: PanierService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      try {
        var id = paramMap.get('id');
        if (id != null) {
          this.presentation =
            await this.presentationService.getPresentationById(+id);
        }
      } catch (error) {
        console.log("Error lors de la recuperation de la presenation");
      }
    });
  }

  objectToLiterral(object: any) {
    return JSON.stringify(object);
  }

  parseJson(json: string) {
    try {
      const parsedJson = JSON.parse(json);
      return parsedJson[0];
    } catch (e) {
      return json;
    }
  }

  addProduct(produitID: number, quantiteCommande: number) {
    if (localStorage.getItem('userId')) {
      const idUser = localStorage.getItem('userId');
      if (idUser) {
        this.panierService
          .addProduct(produitID, quantiteCommande, +idUser[1])
          .then(() => {
            this.message = 'La produit a été ajouté au panier';
            this.messageService.add({
              severity: 'success',
              summary: this.message,
            });
          });
      }
    }
  }
}
