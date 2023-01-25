import {Compte} from "./compte";

export interface Commande {
  id:number;
  dateheurecommande:Date;
  status:string;
  montanttotal:string;
  statusfacture:boolean;
  datefacture:Date;
  nom:string;
  compte:Compte;
}
