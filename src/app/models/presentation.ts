import { Medicament } from './medicament';
import { Estrembourseeas } from './estrembourseeas';

export interface Presentation {
  id: number;
  libelle: string;
  status: string;
  etatcommercialisation: string;
  datecommercialisation: Date;
  codecip13: number;
  agrement: string;
  prix: number;
  indications: string;
  quantitedispo: number;
  codecis: Medicament;
  estrembourseeas: Estrembourseeas[];
}
