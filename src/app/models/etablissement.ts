import {ServicePublicHospitalier} from "./servicePublicHospitalier";
import {ModeDeFixationDesTarif} from "./modeDeFixationDesTarif";
import {CodeApe} from "./codeApe";
import {Categorieetablissement} from "./categorieetablissement";


export interface Etablissement {
  id: number;
  finessej:number;
  ligneacheminement:string;
  siret:number;
  dateouverture:Date;
  dateautorisation:Date;
  datemajstructure:Date;
  numerouai:string;
  coordsource:string;
  telephone:string;
  telecopie:string;
  raisonsociale:string;
  raisonsocialeIntegerue:string;
  complementraisonsociale:string;
  complementdistribution:string;
  coordx:number;
  coordy:number;
  numerovoie:number;
  nomvoie:number;
  complementvoie:string;
  lieudit:string;
  codecommune:number;
  datemajcoord:Date;
  codedepartement:string;
  nomdepartement:string;
  codesph:ServicePublicHospitalier;
  codemft:ModeDeFixationDesTarif;
  codeape:CodeApe;
  categorie:Categorieetablissement;
}
