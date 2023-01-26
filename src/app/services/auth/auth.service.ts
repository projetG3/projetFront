import { Injectable } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Compte } from 'src/app/models/compte';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isConnected !:boolean
  constructor(private httpClient: HttpClient) { }


  public async seConnecter(userInfo: Utilisateur){
    await this.checkUser(userInfo);
    localStorage.setItem('ACCESS_TOKEN', "access_token");
    this.isConnected = true;
  }

  public seConnecte(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
    this.isConnected = true;
  }
  public seDdeconnecter(){
    localStorage.removeItem('ACCESS_TOKEN');
    this.isConnected = false;
  }

  async checkUser(user : Utilisateur): Promise<any> {
    try {
      let reponse = await lastValueFrom(this.httpClient.post<Compte>('http://localhost:8080/compte/auth', {id:user.id, password:user.password}));
      console.log(reponse);
      return {compte : reponse};
    } catch (error : any) {
      return {error : error.error.message};
    }
  }

}
