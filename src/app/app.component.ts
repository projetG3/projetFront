import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import {VoieAdministration} from "./models/voieAdministration";
import {VoieAdministrationService} from "./services/voieadministration.service";
import {CritereRecherche} from "./models/critereRecherche";
import {Presentation} from "./models/presentation";
import {PresentationService} from "./services/presentation.service";
import {ResultatRecherche} from "./models/resultatRecherche";
import { Observable } from 'rxjs';
import { Commande } from './models/commande';

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

  //nomSelected:string='';
  //libeleSelected:string='';
  //generiqueSelected:string='';
  voieAdministrationSelected!:VoieAdministration;

  critereRecherche!:CritereRecherche;
  commandesCompte!: Observable<Commande>;

  //---mes inputs----
  libellePresentation : string ='';
  libelleMedicament : string ='';
  generique : string ='';
  mesVoiesAdministrations : string[] =[];


  async ngOnInit() {
    this.voieAdministrations = await this.voieAdministration.getVoieAdministration();
    this.commandesCompte = this.auth.commandesCompte;
  }

  constructor(private auth: AuthService,private router: Router, private voieAdministration: VoieAdministrationService, private presentation: PresentationService){
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
      libellePresentation: "cone",
      libelleMedicament: "prolypropyl",
      generique: "nebi",
      voieAdministrations: ["oral"],
    }

    this.critereRecherche = {
      libellePresentation: this.libellePresentation,
      libelleMedicament: this.libelleMedicament,
      generique: this.generique,
      voieAdministrations: ["oral"],
    }

    console.log("JE RECHERCHE !")
    let monResultatDeRecherche: ResultatRecherche[] = await this.presentation.getPrescriptionsBySearchResult(this.critereRecherche);
    console.log("MON RESULTAT DE RECHERCHE = " + monResultatDeRecherche.toString());

  }

}
