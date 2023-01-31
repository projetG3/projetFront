import { Commande } from "./commande";
import {Presentation} from "./presentation";


export interface Estconstitueede {
  id: number;
  presentation: Presentation;
  quantite: number;
  terminer: Boolean;
  //idcommande:Commande;
}
