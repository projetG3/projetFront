import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { Presentation } from '../../models/presentation';
import { PanierService } from '../../services/panier.service';
import { PresentationService } from '../../services/presentation.service';

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
        console.log('Error lors de la recuperation de la presenation');
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
          .addProduct(
            produitID,
            quantiteCommande,
            parseInt(idUser!.replace(/[^\d]/g, ''))
          )
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
