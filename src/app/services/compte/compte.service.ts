import { Injectable } from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private url: string = "http://localhost:8080/compte";

  constructor(private http: HttpClient) { }

  checkUser(user : Utilisateur): Observable<Object> {
    return this.http.get(`${this.url}/auth/${user.id}`);
  }

}
