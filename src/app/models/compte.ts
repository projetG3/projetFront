import {Etablissement} from "./etablissement";

export interface Compte {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  etablissement: Etablissement;
}
