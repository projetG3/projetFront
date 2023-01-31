import { Commande } from "./commande";
import {Etablissement} from "./etablissement";

export interface Compte {
  id: number,
  motDePasse: string,
  nom: string,
  prenom: string,
  etablissement: Etablissement,
  commandes:Commande[],
};
