import { Presentation } from '../../models/presentation';
import { PanierService } from '../../services/panier.service';
import { Component } from '@angular/core';
import { PresentationService } from '../../services/presentation.service';
import { MessageService } from 'primeng/api';
import {ResultatRecherche} from "../../models/resultatRecherche";

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css'],
})
export class PresentationsComponent {
  mesResultatDeRecherche: Array<ResultatRecherche> = [];
  presentationsId: Array<number> = [];
  first = 0;
  rows = 6; // Nombree de produit par page
  message!: string;

  constructor(
    private presentation: PresentationService,
    private panierService: PanierService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.presentation.presentationsCourantes$.subscribe(data => {
      this.mesResultatDeRecherche = data;
    });
  }

  getListVoieAdministration(presentation: Presentation) {
    let s = '';
    presentation.codecis.administrepars.forEach(
      (admi) => (s += admi.voieadministration.id.toString() + ' ')
    );
    return s;
  }

  onPageChange(event: { first: number }) {
    this.first = event.first;
  }

  addProduct(produitID: number, quantiteCommande: number) {
    if (localStorage.getItem('userId')) {
      const idUser = localStorage.getItem('userId');
      if (idUser) {
        this.panierService
          .addProduct(produitID, quantiteCommande, parseInt(idUser!.replace(/[^\d]/g, '')))
          .then(() => {
            this.message = 'La produit a été ajouté au panier';
            this.messageService.add({
              severity: 'success',
              summary: this.message,
            });
          });
      }
    }
    quantiteCommande = 1;
  }

  getPresentationStatus(){
    return this.presentation.status;
  }
}

