import {Component} from "@angular/core";
import {Commande} from "../../models/commande";
import {CommandeService} from "../../services/commande.service";
import {AuthService} from "../../services/auth.service";
import { lastValueFrom } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent {

  idCompte!:number;
  commandes: Commande[]=[];
  commandesTypes: Commande[]=[];
  commandesNormales: Commande[]=[];

  constructor(private commande:CommandeService, private auth:AuthService, private httpClient: HttpClient, private messageService: MessageService) {
  }

  async ngOnInit() {
    let id = localStorage.getItem('userId');
    if(id!=null){
      this.idCompte = parseInt(id.replace(/[^\d]/g, '')) ;
      this.commandes = await this.commande.getCommandeType(this.idCompte);
    }
  }

  async ajouterCommandeType(idCommandeType: number){
    let idUser = localStorage.getItem('userId');

    let user = parseInt(idUser!.replace(/[^\d]/g, ''));

    try {
      let reponse : Commande = await lastValueFrom(
        this.httpClient.get<Commande>('http://localhost:8080/commande/ajoutercommandetype/' + user + '/' + idCommandeType));
        localStorage.setItem("panier", JSON.stringify(reponse));
        let message = 'Commande type ajoutée au panier';
        this.messageService.add({
          severity: 'success',
          summary: message,
        });
    } catch (error: any) {
      throw new Error(error);
    }
  }

}
