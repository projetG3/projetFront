import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commande } from 'src/app/models/commande';
import { Compte } from 'src/app/models/compte';
import { Presentation } from 'src/app/models/presentation';
import { PanierService } from 'src/app/services/panier/panier.service';

import { Utilisateur } from '../../models/utilisateur';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  isAccountInvalid = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  get formControls() {
    return this.loginForm.controls;
  }
  async seConnecter() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    var user: Utilisateur = {
      id: this.loginForm.value.id,
      password: this.loginForm.value.password,
    };

    try {
      console.log("avant check user");
        let compte : Compte = await this.authService.checkUser(user);
        console.log(compte);
        console.log("apres check user");
        let obj : Commande = compte.commandes[0];
        console.log("avant log");
        console.log(obj);
        console.log("apris log");
        this.isAccountInvalid = false;
        this.authService.seConnecter(this.loginForm.value);
        this.router.navigateByUrl('/admin');
    } catch(error) {
        this.isAccountInvalid = true;
    }
  }

}
