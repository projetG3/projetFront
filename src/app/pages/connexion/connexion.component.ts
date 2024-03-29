import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compte } from 'src/app/models/compte';

import { Utilisateur } from '../../models/utilisateur';
import { AuthService } from '../../services/auth.service';
import { PanierService } from '../../services/panier.service';

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
    private formBuilder: FormBuilder,
    private panier: PanierService
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
      let compte: Compte = await this.authService.checkUser(user);
      this.panier.getCommandeEnCours(compte.commandes);
      this.isAccountInvalid = false;
      this.authService.seConnecter(this.loginForm.value);
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.isAccountInvalid = true;
    }
  }
}
