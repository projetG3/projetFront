import { Estconstitueede } from "./estConstitueeDe";

export interface Commande {
  id:number;
  dateheurecommande:Date;
  status:string;
  montanttotal:string;
  statusfacture:boolean;
  datefacture:Date;
  nom:string;
  estconstitueedes:Estconstitueede[];
}
