import { Medicament } from './../models/medicament';
import { PresentationService } from './../services/presentation/presentation.service';
import { Presentation } from './../models/presentation';
import { Component } from '@angular/core';
import { Produit } from '../models/produit';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent {
  presentations!:Presentation[];
  constructor(private presentationService: PresentationService) {
    // presentations = this.presentationService.getAllPresentation();
  }


  ngOnInit() {
    const p : Presentation= {
      id:3,
      libelle:"ceci est une decription",
      status:"disponible",
      etatcommercialisation:"non commercialiser",
      datecommercialisation:new Date(),
      codecip13:1,
      agrement:"string",
      prix:20,
      indications:"string",
      quantitedispo:2,
    };
    this.presentations = [p,p,p,p,p,p,p,p,p,p]
  }
}
