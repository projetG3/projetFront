import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import {VoieAdministration} from "./models/voieAdministration";
import {VoieAdministrationService} from "./services/voieadministration/voieadministration.service";
import {CritereRecherche} from "./models/critereRecherche";
import {Presentation} from "./models/presentation";
import {PresentationService} from "./services/presentation/presentation.service";

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

  nomSelected:string='';
  libeleSelected:string='';
  generiqueSelected:string='';
  voieAdministrationSelected!:VoieAdministration;

  critereRecherche!:CritereRecherche;

  async ngOnInit() {
    this.voieAdministrations = await this.voieAdministration.getVoieAdministration();
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
  onLibeleChange(value:string){
    this.libeleSelected=value;
  }
  onGeneriqueChange(value:string){
    this.generiqueSelected=value;
  }
  resetLibele(){
    this.libeleSelected='';
  }
  resetGenerique(){
    this.generiqueSelected='';
  }
  demanderPresentation(){
    console.log("JE RECHERCHE !")
    this.critereRecherche={
      nom:this.nomSelected,
      libelé:this.libeleSelected,
      generique:this.generiqueSelected,
      voieadministrations:this.voieAdministrations
    }
    //this.presentation.getPrescriptionsBySearchResult()
  }
}
