import {Injectable} from "@angular/core";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Medicament} from "../../models/medicament";

@Injectable({
  providedIn: 'root'
})

export class MedicamentService {

  constructor(private httpClient: HttpClient) { }

  async getAllMedicament(): Promise<any> {
      try {
        let reponse = await lastValueFrom(this.httpClient.get<Medicament[]>('http://localhost:8080/medicament/list'));
        console.log(reponse);
        return reponse;
      } catch (error : any) {
        return {error : error.error.message};
      }
    }

}
