import {Component} from "@angular/core";
import {Commande} from "../../models/commande";
import {CommandeService} from "../../services/commande.service";
import {AuthService} from "../../services/auth.service";

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

  constructor(private commande:CommandeService, private auth:AuthService) {
  }

  async ngOnInit() {
    let id = localStorage.getItem('userId');
    if(id!=null){
      this.idCompte = parseInt(id.replace(/[^\d]/g, '')) ;
      this.commandes = await this.commande.getCommandeType(this.idCompte);
    }
    console.log("mes commandes")
    console.log(this.commandes)
  }

}
