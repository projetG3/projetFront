import { Titulaire } from './titulaire';
import { VoieAdministration } from './voieAdministration';

export interface RechercheMedicament {
  nom: string;
  formepharmaceutique: string;
  voieadministrations: VoieAdministration[];
  titulaires: Titulaire;
}
