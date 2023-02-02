import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PanierService} from "./panier.service";
import {IdCompte} from "../models/idCompte";
import {lastValueFrom} from "rxjs";
import {Commande} from "../models/commande";

@Injectable({
  providedIn: 'root',
})
export class CommandeService {

  commandesUser:string=""


  constructor(private httpClient: HttpClient) {}

  async getCommandeType(id: number) {
    try {
      let reponse = await lastValueFrom(
        this.httpClient.get<Commande[]>('http://localhost:8080/commande/getCommandeType/'+id)
      );
      console.log("Mes commandes");
      console.log(reponse);
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }

}
