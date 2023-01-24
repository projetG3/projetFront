import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetfront';
  isRouteConnexion = false;
  constructor(private auth: AuthService,private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRouteConnexion = event.url === '/connexion';
      }
    });
  }

  getStatutConnection(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  seDeconnecter(){
    this.auth.seDdeconnecter();
    this.router.navigateByUrl('/home');
  }
}
