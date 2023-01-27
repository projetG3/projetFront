import {VoieAdministration} from "./voieAdministration";
import {Titulaire} from "./titulaire";

export interface CritereRecherche {
  nom: string;
  libelé: string;
  voieadministrations:VoieAdministration[];
  generique: string;
}
