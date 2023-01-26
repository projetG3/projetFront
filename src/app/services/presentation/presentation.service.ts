import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Medicament} from "../../models/medicament";
import {Presentation} from "../../models/presentation";

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
}
