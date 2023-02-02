import { VoieAdministration } from './voieAdministration';
import { Titulaire } from './titulaire';

export interface CritereRecherche {
  libellePresentation: string;
  libelleMedicament: string;
  generique: string;
  voieAdministrations:string[];
  denominationSubstance: string;

}
