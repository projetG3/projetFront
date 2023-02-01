import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Compte } from 'src/app/models/compte';
import { Commande } from 'src/app/models/commande';
import { PanierService } from './panier.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isConnected!: boolean;
  commandesCompte!:Observable<Commande>;

  constructor(private httpClient: HttpClient, private panier: PanierService) {}

  public async seConnecter(userInfo: Utilisateur) {
    await this.checkUser(userInfo);
    localStorage.setItem('ACCESS_TOKEN', 'access_token');
    localStorage.setItem('userId', JSON.stringify(userInfo.id));
    this.isConnected = true;
  }

  public seConnecte() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public seDdeconnecter() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('userId');
    this.isConnected = false;
  }

  async checkUser(user: Utilisateur): Promise<Compte> {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })};
      let reponse = await lastValueFrom(
        this.httpClient.post<Compte>('http://localhost:8080/compte/auth', {
          id: user.id,
          password: user.password,
        }, httpOptions)
      );
      //let reponseCommande = await this.panier.getCommandeCourante(user.id)
      //this.commandesCompte = of(reponseCommande);
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }

}
