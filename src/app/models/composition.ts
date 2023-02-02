import {Medicament} from "./medicament";

export interface Composition {
  id: number;
  codesubstance:number;
  designationpharmaceutique:string;
  denominationsubstance:string;
  dosage:string;
  referencedosage:string;
  nature:string;
  numerolier:number;
  codecis:Medicament;
}
