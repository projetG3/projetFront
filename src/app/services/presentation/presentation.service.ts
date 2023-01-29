import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Presentation} from "../../models/presentation";
import {CritereRecherche} from "../../models/critereRecherche";

@Injectable({
  providedIn: 'root'
})

export class PresentationService {

  constructor(private httpClient: HttpClient) { }


  async getAllPresentation(): Promise<any> {
    try {
      let reponse = await lastValueFrom(this.httpClient.get<Presentation[]>('http://localhost:8080/presentation/list'));
      console.log(reponse);
      return reponse;
    } catch (error : any) {
      return {error : error.error.message};
    }
  }

  async getPrescriptionsBySearchResult(critereRecherche : CritereRecherche): Promise<Presentation[]> {
    try {
      let reponse = await lastValueFrom(this.httpClient.post<Presentation[]>('http://localhost:8080/presentation/resultat', {nom:critereRecherche.nom, libelle:critereRecherche.libelle, voieAdministrations:critereRecherche.voieAdministrations, generique:critereRecherche.generique}));
      return reponse;
    } catch (error : any) {
      throw new Error(error);
    }
  }

  async getPresentationById(id: number): Promise<Presentation> {
    try {
      let reponse = await lastValueFrom(this.httpClient.get<Presentation>('http://localhost:8080/presentation/'+id));
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }



}
