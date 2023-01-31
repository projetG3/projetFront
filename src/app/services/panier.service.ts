import { Commande } from 'src/app/models/commande';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ResultatAddProduit } from 'src/app/models/resultatAddProduit';
import { PanierComponent } from 'src/app/pages/panier/panier.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private dataSubject = new Subject<Commande|undefined>();
  panier$ = this.dataSubject.asObservable();
  panier : Commande | undefined;

  constructor(private httpClient: HttpClient) { }

  updateData(panier: Commande | undefined) {
    this.panier = panier;
    this.dataSubject.next(this.panier);
  }

  async addProduct(produit: number, quantiteCommande: number, idCompte: number): Promise<Commande> {
    const body = {
      "produit": produit,
      "quantiteCommande": quantiteCommande,
      "idCompte": idCompte
    };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    try{
      let resultatAddProduit = await lastValueFrom(this.httpClient.post<Commande>('http://localhost:8080/presentation/resultat', body));
      this.panier = resultatAddProduit;
      return resultatAddProduit;
    }catch(error: any){
      throw new Error(error);
    }
  }

  getCommandeEnCours(commandelist:Commande[]) {
    let resultCommande : Commande | undefined = undefined;
    commandelist.forEach((commande) => {
      if(commande.status === 'en cours'){
        resultCommande = commande;
        console.log("commande trouvée");
      }
    });
    this.updateData(resultCommande);
    localStorage.setItem('panier',JSON.stringify(resultCommande));
    console.log(this.panier);
  }


  /*  async getCommandeCourante(idCompte: number): Promise<Commande> {
      let body = idCompte;
      try{
        let resultatAddProduit = await lastValueFrom(this.httpClient.post<Commande>('http://localhost:8080/commande/commandecourante', body, { headers: { 'Content-Type': 'application/json' }}));
        return resultatAddProduit;
      }catch(error: any){
        throw new Error(error);
      }
    }
    */
}
