import {Presentation} from "./presentation";
import {Commande} from "./commande";

export interface EstConstitueeDe {
  id: number;
  presentation: Presentation;
  quantite: number;
  terminer: Boolean;
}

