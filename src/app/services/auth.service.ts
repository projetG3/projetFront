import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Commande } from 'src/app/models/commande';
import { Compte } from 'src/app/models/compte';

import { Utilisateur } from '../models/utilisateur';
import { PanierService } from './panier.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isConnected!: boolean;
  commandesCompte!: Observable<Commande>;

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
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
      };
      let reponse = await lastValueFrom(
        this.httpClient.post<Compte>(
          'http://localhost:8080/compte/auth',
          {
            id: user.id,
            password: user.password,
          },
          httpOptions
        )
      );
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
