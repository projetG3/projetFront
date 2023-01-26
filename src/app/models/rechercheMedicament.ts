import {VoieAdministration} from "./voieAdministration";
import {AdministrerPar} from "./administrePar";
import {Titulaire} from "./titulaire";

export interface RechercheMedicament {
  nom: string;
  formepharmaceutique: string;
  voieadministrations:VoieAdministration[];
  titulaires: Titulaire;

}
