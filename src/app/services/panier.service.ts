import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Subject } from 'rxjs';
import { Commande } from 'src/app/models/commande';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private dataSubject = new Subject<Commande | undefined>();
  panier$ = this.dataSubject.asObservable();
  panier: Commande | undefined;

  constructor(private httpClient: HttpClient) {}

  updateData(panier: Commande | undefined) {
    this.panier = panier;
    this?.dataSubject?.next(this.panier);
  }

  async addProduct(
    produit: number,
    quantiteCommande: number,
    idCompte: number
  ): Promise<Commande> {
    const body = {
      produit: produit,
      quantiteCommande: quantiteCommande,
      idCompte: idCompte,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    try {
      let resultatAddProduit = await lastValueFrom(
        this.httpClient.post<Commande>(
          'http://localhost:4200/api/commande/addProduct',
          body,
          httpOptions
        )
      );
      this.panier = resultatAddProduit;
      localStorage.setItem('panier', JSON.stringify(resultatAddProduit));
      return resultatAddProduit;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  getCommandeEnCours(commandelist: Commande[]) {
    let resultCommande: Commande | undefined = undefined;
    commandelist.forEach((commande) => {
      if (commande.status === 'en cours') {
        resultCommande = commande;
      }
    });
    this.updateData(resultCommande);
    localStorage.setItem('panier',JSON.stringify(resultCommande));
  }
}
