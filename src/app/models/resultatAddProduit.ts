import {Presentation} from "./presentation";
import {Commande} from "./commande";
import {EstConstitueeDe} from "./estConstitueeDe";

export interface ResultatRecherche {
  commande : Commande;
  estconstitueedes: EstConstitueeDe[];
}
