import {VoieAdministration} from "./voieAdministration";
import {EstDelivreSous} from "./estDelivreSous";
import {EstCreerPar} from "./estCreerPar";
import {Informe} from "./informe";
import {AdministrerPar} from "./administrePar";

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
  administrepars:AdministrerPar[];
  estcrerpar:EstCreerPar[];
  estdelivresous:EstDelivreSous[];
  informe:Informe[];
}
