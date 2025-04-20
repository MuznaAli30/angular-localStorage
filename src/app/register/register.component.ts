import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const existingUsers = this.auth.getUsers();
    const userExists = existingUsers.find((user) => user.username === this.username);
    if (userExists) {
      alert('User already exists!');
      return;
    }

    const newUser = { username: this.username, password: this.password };
    this.auth.addUser(newUser);
    alert('Registered successfully!');
    this.router.navigate(['/login']);
  }
}
