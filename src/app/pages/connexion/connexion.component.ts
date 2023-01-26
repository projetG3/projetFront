import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { Utilisateur } from '../../models/utilisateur';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted  =  false;

  constructor(private authService: AuthService,private router: Router, private formBuilder: FormBuilder) { }
    ngOnInit() {
      this.loginForm  =  this.formBuilder.group({
          id: ['', Validators.required],
          password: ['', Validators.required]
      });
  }
  get formControls() { return this.loginForm.controls; }

  seConnecter(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    var user: Utilisateur = {
      id: this.loginForm.value.id,
      password: this.loginForm.value.password
    };

    /*if(this.compteService.checkUser(user)){
      return
    }*/

    this.authService.seConnecter(this.loginForm.value);
    this.router.navigateByUrl('/admin');
  }

}
