import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { VoieAdministration } from '../models/voieAdministration';

@Injectable({
  providedIn: 'root',
})
export class VoieAdministrationService {
  constructor(private httpClient: HttpClient) {}

  async getVoieAdministration(): Promise<any> {
    try {
      let reponse = await lastValueFrom(
        this.httpClient.get<VoieAdministration[]>(
          'http://localhost:8080/voieadministration/list'
        )
      );
      return reponse;
    } catch (error: any) {
      return { error: error.error.message };
    }
  }
}
