import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  user: any;
  users: any[] = [];
  editingIndex: number | null = null;
  editedUsername: string = '';
  editedPassword: string = '';

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getLoggedInUser();
    this.loadUsers();
  }

  loadUsers() {
    if (this.user.username === 'Admin' && this.user.password === 'admin1') {
      this.users = this.auth.getUsers(); // admin sees all
    } else {
      this.users = [this.user]; // regular user sees only themself
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  deleteUser(index: number) {
    this.auth.deleteUser(index);
    this.loadUsers();
  }

  startEditing(index: number) {
    this.editingIndex = index;
    this.editedUsername = this.users[index].username;
    this.editedPassword = this.users[index].password;
  }

  updateUser() {
    if (this.editingIndex !== null) {
      // For admin, index is correct. For user, update by username
      if (this.isAdmin()) {
        this.auth.updateUser(this.editingIndex, {
          username: this.editedUsername,
          password: this.editedPassword
        });
      } else {
        this.auth.updateUserByUsername(this.user.username, {
          username: this.editedUsername,
          password: this.editedPassword
        });
      }

      this.editingIndex = null;
      this.loadUsers();
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  isAdmin(): boolean {
    return this.user.username === 'Admin' && this.user.password === 'admin1';
  }
}
