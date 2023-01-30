import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  constructor(private httpClient: HttpClient) { }


  addProduct(produit: number, quantiteCommande: number, idCompte: number): Promise<ResultatAdd> {
    const body = {
      "produit": produit,
      "quantiteCommande": quantiteCommande,
      "idCompte": idCompte
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.post('http://localhost:8080/commande/addProduct', body, httpOptions);
  }


}
