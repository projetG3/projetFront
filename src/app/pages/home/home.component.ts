import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  password = 'oui';
  constructor(private auth: AuthService) {}
  isConnected() {
    return this.auth.isConnected;
  }
}
