import {Presentation} from "./presentation";
import {Commande} from "./commande";
import {Estconstitueede} from "./estConstitueeDe";


export interface ResultatAddProduit {
  commande : Commande;
  estconstitueedes: Estconstitueede[];
}
