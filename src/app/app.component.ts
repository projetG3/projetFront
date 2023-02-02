import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Commande } from './models/commande';
import { CritereRecherche } from './models/critereRecherche';
import { ResultatRecherche } from './models/resultatRecherche';
import { VoieAdministration } from './models/voieAdministration';
import { AuthService } from './services/auth.service';
import { PresentationService } from './services/presentation.service';
import { VoieAdministrationService } from './services/voieadministration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projetfront';
  isRouteConnexion = false;
  displayCriteria = false;

  voieAdministrations!: VoieAdministration[];
  voieAdministrationsString!: String[];
  voieAdministrationStringSelected: String = '';

  critereRecherche!: CritereRecherche;
  commandesCompte!: Observable<Commande>;

  //---mes inputs----
  libellePresentation: string = '';
  libelleMedicament: string = '';
  generique: string = '';
  mesVoiesAdministrations: string[] = [];

  async ngOnInit() {
    try {
      this.voieAdministrations =
        await this.voieAdministration.getVoieAdministration();

      if (Array.isArray(this.voieAdministrations)) {
        this.voieAdministrationsString = this.voieAdministrations.map(
          (data) => data.id
        );
      } else {
        console.error('voieAdministrations is not an array');
      }
    } catch (error) {
      console.error(
        'An error occurred while fetching voieAdministrations: ',
        error
      );
    }

    this.commandesCompte = this.auth.commandesCompte;
  }
  constructor(
    private auth: AuthService,
    private router: Router,
    private voieAdministration: VoieAdministrationService,
    private presentation: PresentationService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRouteConnexion = event.url === '/connexion';
      }
    });
  }

  getStatutConnection() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  seDeconnecter() {
    this.auth.seDdeconnecter();
    this.router.navigateByUrl('/home');
  }

  afficherCritres() {
    this.displayCriteria = !this.displayCriteria;
  }
  resetLibellePresentation() {
    this.libellePresentation = '';
  }
  resetLibelleMedicament() {
    this.libelleMedicament = '';
  }
  resetGenerique() {
    this.generique = '';
  }
  async demanderPresentation() {
    this.displayCriteria = false;

    this.critereRecherche = {
      libellePresentation: this.libellePresentation,
      libelleMedicament: this.libelleMedicament,
      generique: this.generique,
      voieAdministrations: [this.voieAdministrationStringSelected],
    };

    console.log(this.critereRecherche);
    console.log('JE RECHERCHE !');
    let monResultatDeRecherche: ResultatRecherche[] =
      await this.presentation.getPrescriptionsBySearchResult(
        this.critereRecherche
      );
    console.log('MON RESULTAT DE RECHERCHE = ');
    console.log(monResultatDeRecherche);
  }

  onClick(voieAdministration: String) {
    this.voieAdministrationStringSelected = voieAdministration;
  }

  getNbProdPanier() {
    let nbProd = 0;
    const localPanier = of(localStorage.getItem('panier'));
    localPanier.subscribe((panier) => {
      if (panier != null) {
        try {
          nbProd = JSON?.parse(panier)?.estconstitueedes?.length;
        } catch (e) {}
      }
    });
    return nbProd;
  }
}
