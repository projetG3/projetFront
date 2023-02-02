import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Commande } from './models/commande';
import { Composition } from './models/composition';
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

  voieAdministrations!:VoieAdministration[];
  voieAdministrationsString!:string[];
  voieAdministrationStringSelected:string="";

  compositions!:Composition[];
  principeActifs!:string[];
  principeActifSelected:string="";


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
      denominationSubstance: this.principeActifSelected
    }

    let monResultatDeRecherche: ResultatRecherche[] = await this.presentation.getPrescriptionsBySearchResult(this.critereRecherche);
  }

  onClickVoieAdministration(voieAdministration:string){
    this.voieAdministrationStringSelected=voieAdministration;
  }

  onClickPrincipeAftif(principeActif:string){
    this.principeActifSelected=principeActif;
  }

  resetAll(){
    this.resetLibellePresentation();
    this.resetLibelleMedicament();
    this.resetGenerique();
    this.voieAdministrationStringSelected="";
    this.principeActifSelected="";
  }


  getNbProdPanier(){
    let nbProd = 0;

    const localPanier = of(localStorage.getItem("panier"));
    localPanier.subscribe((panier) => {
      if (panier !== null) {
        try {
          const parsedPanier = JSON.parse(panier);
          nbProd = parsedPanier.estconstitueedes.length;
        } catch (e) {
          //console.error("Invalid JSON in localStorage:", e);
        }
      }
    });

    return nbProd;
  }

}
