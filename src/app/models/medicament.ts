import { AdministrerPar } from './administrePar';
import { EstCreerPar } from './estCreerPar';
import { EstDelivreSous } from './estDelivreSous';
import { Informe } from './informe';

export interface Medicament {
  id: number;
  nom: string;
  formepharmaceutique: string;
  statutadministratif: string;
  typeprocedure: string;
  etatcommercialisation: string;
  dateamm: Date;
  statusbdm: string;
  numeroautorisationeuropeenne: string;
  surveillancerenforcee: boolean;
  administrepars: AdministrerPar[];
  estcrerpar: EstCreerPar[];
  estdelivresous: EstDelivreSous[];
  informe: Informe[];
}
