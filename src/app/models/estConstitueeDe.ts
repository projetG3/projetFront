import {Presentation} from "./presentation";
import {Commande} from "./commande";


export interface Estconstitueede {
  id: number;
  presentation: Presentation;
  quantite: number;
  terminer: Boolean;
  //idcommande:Commande;
}
