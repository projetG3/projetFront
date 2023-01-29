import {VoieAdministration} from "./voieAdministration";
import {Titulaire} from "./titulaire";

export interface CritereRecherche {
  nom: string;
  libelle: string;
  voieAdministrations:String[];
  generique: string;
}
