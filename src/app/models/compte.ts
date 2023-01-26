import {Etablissement} from "./etablissement";

export interface Compte {
  id: number;
  password: string;
  nom: string;
  prenom: string;
  etablissement: Etablissement;
}
