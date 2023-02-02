import { Commande } from './commande';
import { Estconstitueede } from './estconstitueede';

export interface ResultatAddProduit {
  commande: Commande;
  estconstitueedes: Estconstitueede[];
}
