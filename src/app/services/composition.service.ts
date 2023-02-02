import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Composition} from "../models/composition";

@Injectable({
  providedIn: 'root',
})
export class CompositionService {
  constructor(private httpClient: HttpClient) {}

  async getAllCompositions(): Promise<any> {
    try {
      let reponse = await lastValueFrom(
        this.httpClient.get<String[]>(
          'http://localhost:8080/compositions/principeactif'
        )
      );
      return reponse;
    } catch (error: any) {
      return { error: error.error.message };
    }
  }
}
