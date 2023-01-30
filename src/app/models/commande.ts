import {Compte} from "./compte";
import { Estconstitueede } from './estconstitueede';



export interface Commande {
  id:number;
  dateheurecommande:Date;
  status:string;
  montanttotal:string;
  statusfacture:boolean;
  datefacture:Date;
  nom:string;
  compte:Compte;
  estconstitueedes:Estconstitueede[];
}
