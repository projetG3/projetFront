import { Commande } from 'src/app/models/commande';

import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, of } from 'rxjs';
import { Estconstitueede } from 'src/app/models/estConstitueeDe';
import { Presentation } from 'src/app/models/presentation';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {

  panier!: Commande | undefined;
  constructor(private panierService: PanierService, private httpClient: HttpClient, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.panierService.panier$.subscribe((panier: Commande | undefined) => (this.panier = panier));
    this.panier = this.panierService.panier;
    const panierFromLocalStorage = localStorage.getItem('panier');
    if (panierFromLocalStorage !== null) {
      this.panier = JSON.parse(panierFromLocalStorage);
    }
  }

  getTotal():number{
    let total=0
    if(this.panier){
      this.panier.estconstitueedes.forEach((estconstitueede) => total += (estconstitueede.quantite * estconstitueede.presentation.prix)  )
    }
    return total;
  }

  async updateQuantite(constitueedeID : number){
    console.log(this.panier);
    let trouver : boolean = false;
    let i : number = 0;
    let estconstitueede : Estconstitueede;
    while(!trouver || i < this.panier!.estconstitueedes.length){
      if(constitueedeID == this.panier!.estconstitueedes[i].id){
        trouver = true;
        estconstitueede = this.panier!.estconstitueedes[i];
      }
      i++;
    }
    let idUser = localStorage.getItem('userId');
    let user = +idUser![1];
    try {
      let reponse = await lastValueFrom(
        this.httpClient.post<Commande>('http://localhost:8080/commande/updateQuantite', 
        {
          "produit": estconstitueede!.presentation.id,
          "quantiteCommande": estconstitueede!.quantite,
          "idCompte": user
      })
      );
      this.panier = reponse;
      localStorage.setItem("panier", JSON.stringify(reponse));
      return reponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }


  async validerCommande() {
    let idUser = localStorage.getItem('userId');
    let user = +idUser![1];
    try {
      let reponse = await lastValueFrom(
        this.httpClient.get<Presentation[]>('http://localhost:8080/commande/valider/' + user + '/' + this.panier!.id));
        if(reponse.length != 0){
          console.log("pas vide");
          let text : string = "Certains produits ne sont pas en stock : \n";
          reponse.forEach((presentation) => {text += " - " + presentation.codecis.nom + " \n"});
          text += "Voulez vous tout de même valider votre commande ?"
          if(confirm(text)){
            console.log("confirmer");
            await lastValueFrom(this.httpClient.get<Boolean>('http://localhost:8080/commande/validerforce/' + user + '/' + this.panier!.id));
            this.panier = undefined;
            localStorage.setItem('panier', '');
            this.messageService.add({
              severity: 'success',
              summary: "Commande validée",
            });
          }
        }
        //ensuite, si la liste n'est pas vide alors on affiche les produits pour lesquels il manque des stock et on demande à l'utilisateur s'il veut tout de même valider sa commande. Deux cas :
        // 1. il veut valider la commande -> on appel la méthode pour forcer la validation. Une fois fait, il faut bien penser à vider le localStorage (panier)
        // 2. il ne veut pas forcer, alors on ne fait rien de particulier
    } catch (error: any) {
      throw new Error(error);
    }

  }



}
