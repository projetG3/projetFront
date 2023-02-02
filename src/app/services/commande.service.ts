import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PanierService} from "./panier.service";
import {IdCompte} from "../models/idCompte";
import {lastValueFrom} from "rxjs";
import {Commande} from "../models/commande";
import { PresentationService } from "./presentation.service";

@Injectable({
  providedIn: 'root',
})
export class CommandeService {

  commandesUser:string=""

  status = ''
  constructor(private httpClient: HttpClient) {}

  async getCommandeType(id: number) {
    try {
      this.status="Recherche en cours";
      let reponse = await lastValueFrom(
        this.httpClient.get<Commande[]>('http://localhost:8080/commande/getCommandeType/'+id)
      );
      if(reponse.length == 0){
        this.status = "Aucun résultat";
      }
      else{
        this.status = "";
      }
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }

}
