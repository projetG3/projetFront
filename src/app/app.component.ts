import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import {VoieAdministration} from "./models/voieAdministration";
import {VoieAdministrationService} from "./services/voieadministration.service";
import {CritereRecherche} from "./models/critereRecherche";
import {Presentation} from "./models/presentation";
import {PresentationService} from "./services/presentation.service";
import {ResultatRecherche} from "./models/resultatRecherche";
import { Observable, of } from 'rxjs';
import { Commande } from './models/commande';
import {CompositionService} from "./services/composition.service";
import {Composition} from "./models/composition";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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


  critereRecherche!:CritereRecherche;
  commandesCompte!: Observable<Commande>;

  //---mes inputs----
  libellePresentation : string ='';
  libelleMedicament : string ='';
  generique : string ='';
  mesVoiesAdministrations : string[] =[];
  denominationSubstance : string ='';


  async ngOnInit() {
    this.voieAdministrations = await this.voieAdministration.getVoieAdministration();
    this.voieAdministrationsString = this.voieAdministrations.map(data=>data.id);

    this.principeActifs = await this.composition.getAllCompositions();
    this.principeActifs = this.principeActifs.sort();
    //this.principeActifs = this.compositions.map(data=>data.denominationsubstance);

    this.commandesCompte = this.auth.commandesCompte;
  }

  constructor(private auth: AuthService,private router: Router, private voieAdministration: VoieAdministrationService, private presentation: PresentationService, private composition:CompositionService){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRouteConnexion = event.url === '/connexion';
      }
    });
  }

  getStatutConnection(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  seDeconnecter(){
    this.auth.seDdeconnecter();
    this.router.navigateByUrl('/home');
  }

  afficherCritres(){
    this.displayCriteria=!this.displayCriteria;
  }
  resetLibellePresentation(){
    this.libellePresentation='';
  }
  resetLibelleMedicament(){
    this.libelleMedicament='';
  }
  resetGenerique(){
    this.generique='';
  }
  async demanderPresentation() {
    this.displayCriteria=false;

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
