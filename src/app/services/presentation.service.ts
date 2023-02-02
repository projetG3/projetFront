import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Subject } from 'rxjs';

import { CritereRecherche } from '../models/critereRecherche';
import { Presentation } from '../models/presentation';
import { ResultatRecherche } from '../models/resultatRecherche';

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  private dataSubject = new Subject<any[]>();
  presentationsCourantes$ = this.dataSubject.asObservable();
  presentationsCourantes: ResultatRecherche[] = [];

  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.presentationsCourantes;
  }

  updateData(data: ResultatRecherche[]) {
    this.presentationsCourantes = data;
    this?.dataSubject?.next(this.presentationsCourantes);
  }

  async getPrescriptionsBySearchResult(
    critereRecherche: CritereRecherche
  ): Promise<ResultatRecherche[]> {
    let body = {
      libellePresentation: critereRecherche.libellePresentation,
      libelleMedicament: critereRecherche.libelleMedicament,
      generique: critereRecherche.generique,
      voieAdministrations: critereRecherche.voieAdministrations,
    };

    try {
      let reponse = await lastValueFrom(
        this.httpClient.post<ResultatRecherche[]>(
          'http://localhost:8080/presentation/resultat',
          body
        )
      );
      this.updateData(reponse);
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getPresentationById(id: number): Promise<Presentation> {
    try {
      let reponse = await lastValueFrom(
        this.httpClient.get<Presentation>(
          'http://localhost:8080/presentation/' + id
        )
      );
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
