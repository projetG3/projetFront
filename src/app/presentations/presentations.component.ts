import { Presentation } from './../models/presentation';
import { PanierService } from './../services/panier/panier.service';
import { Component } from '@angular/core';
import { PresentationService } from '../services/presentation/presentation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css'],
})
export class PresentationsComponent {
  presentations: Array<Presentation> = [];
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
    this.presentationsId = [
      3939752
    ];
    //2663325, 2663360, 3454977, 3016430, 3016431, 3953338, 2192305,
    //       3989112, 3989141, 3454664, 3812595, 3845063, 3014176, 3014177, 3696597,
    //       3998223, 3533949, 4924451, 4189767, 4189773, 3967872, 3516069,

    this.presentationsId.forEach(async (id) => {
      try {
        let presentationObjet = await this.presentation.getPresentationById(id);
        this.presentations.push(presentationObjet);
      } catch (error) {
        console.log("Erreur lors de la récuperation de l'une des  presentations");
      }
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
          .addProduct(produitID, quantiteCommande, +idUser[1])
          .subscribe(() => {
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
}

