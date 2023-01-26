import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    var user: Utilisateur = {
      id: this.loginForm.value.id,
      password: this.loginForm.value.password,
    };

    try {
        await this.authService.checkUser(user);
        this.isAccountInvalid = false;
        this.authService.seConnecter(this.loginForm.value);
        this.router.navigateByUrl('/admin');
    } catch(error) {
        this.isAccountInvalid = true;
        console.log(error);
    }
  }

}
