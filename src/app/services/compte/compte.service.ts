import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private url: string = "http://localhost:8080/compte/auth";

  constructor() { }

}
