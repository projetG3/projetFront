import {VoieAdministration} from "./voieAdministration";
import {Titulaire} from "./titulaire";
import {Conditionsmedicamenteuse} from "./conditionsmedicamenteuse";
import {Informationsimportante} from "./informationsimportante";

export interface Medicament {
  id: number;
  nom: string;
  formepharmaceutique: string;
  statutadministratif: string;
  typeprocedure: string;
  etatcommercialisation:string;
  dateamm:Date;
  statusbdm:string;
  numeroautorisationeuropeenne:string;
  surveillancerenforcee:boolean;
  voieadministrations:VoieAdministration[];
  titulaires:Titulaire[];
  conditionsmedicamenteuses:Conditionsmedicamenteuse[];
  informationsimportantes:Informationsimportante[];
}
