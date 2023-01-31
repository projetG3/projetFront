import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Subject} from "rxjs";
import {Presentation} from "../models/presentation";
import {CritereRecherche} from "../models/critereRecherche";
import {ResultatRecherche} from "../models/resultatRecherche";
import {mapOneOrManyArgs} from "rxjs/internal/util/mapOneOrManyArgs";

@Injectable({
  providedIn: 'root'
})

export class PresentationService {

  /*
this.presentationsId = [
  3939752, 2663325, 2663360, 3454977, 3016430, 3016431, 3953338, 2192305,
  3989112, 3989141, 3454664, 3812595, 3845063, 3014176, 3014177, 3696597,
  3998223, 3533949, 4924451, 4189767, 4189773, 3967872, 3516069,
];*/

  private dataSubject = new Subject<any[]>();
  presentationsCourantes$ = this.dataSubject.asObservable();
  presentationsCourantes:Presentation[]=[];

  resultatCourant:ResultatRecherche[]=[];


  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.resultatCourant;
  }

  updateData(data: ResultatRecherche[]) {
    this.resultatCourant = data;
    let presentationsId = this.resultatCourant.map((presentation)=>presentation.codeCIP7);

    presentationsId.forEach(async (id) => {
      try {
        let presentationObjet = await this.getPresentationById(id);
        this.presentationsCourantes.push(presentationObjet);
      } catch (error) {
        console.log("Erreur lors de la récuperation de l'une des presentations");
      }
    });
    this.dataSubject.next(this.presentationsCourantes);

  }

  /*
    async getAllPresentation(): Promise<any> {
      try {
        let reponse = await lastValueFrom(this.httpClient.get<Presentation[]>('http://localhost:8080/presentation/list'));
        return reponse;
      } catch (error : any) {
        return {error : error.error.message};
      }
    }
   */

  async getPrescriptionsBySearchResult(critereRecherche : CritereRecherche): Promise<ResultatRecherche[]> {
    let body = {
      libellePresentation:critereRecherche.libellePresentation,
      libelleMedicament:critereRecherche.libelleMedicament,
      generique:critereRecherche.generique,
      voieAdministrations:critereRecherche.voieAdministrations};

    try {
      let reponse = await lastValueFrom(this.httpClient.post<ResultatRecherche[]>('http://localhost:8080/presentation/resultat', body));
      this.updateData(reponse);
      return reponse;
    } catch (error : any) {
      throw new Error(error);
    }
  }

  async getPresentationById(id: number): Promise<Presentation> {
    try {
      let reponse = await lastValueFrom(this.httpClient.get<Presentation>('http://localhost:8080/presentation/'+id));
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }

}
