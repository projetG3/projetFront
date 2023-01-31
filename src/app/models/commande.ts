import { Estconstitueede } from "./estconstitueede";

export interface Commande {
  forEach(arg0: any);
  id:number;
  dateheurecommande:Date;
  status:string;
  montanttotal:string;
  statusfacture:boolean;
  datefacture:Date;
  nom:string;
  estconstitueedes:Estconstitueede[];
}
