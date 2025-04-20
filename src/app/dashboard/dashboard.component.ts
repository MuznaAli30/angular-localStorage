import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  user: any;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getLoggedInUser();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
