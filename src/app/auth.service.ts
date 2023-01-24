import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isConnected !:boolean
  constructor() { }
  public seConnecter(userInfo: Utilisateur){
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


}
