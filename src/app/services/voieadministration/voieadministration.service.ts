import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CritereRecherche} from "../../models/critereRecherche";
import {lastValueFrom} from "rxjs";
import {VoieAdministration} from "../../models/voieAdministration";

@Injectable({
  providedIn: 'root'
})

export class VoieAdministrationService {

  constructor(private httpClient: HttpClient) {
  }

  async getVoieAdministration(): Promise<any> {
    try {
      let reponse = await lastValueFrom(this.httpClient.get<VoieAdministration[]>('http://localhost:8080/voieadministration/list'));
      console.log(reponse);
      return reponse;
    } catch (error : any) {
      return {error : error.error.message};
    }
  }
}
