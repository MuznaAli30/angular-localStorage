import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUsers(): any[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  addUser(user: any): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

  getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  updateUser(index: number, updatedUser: any): void {
    const users = this.getUsers();
    users[index] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));

    const loggedInUser = this.getLoggedInUser();
    if (loggedInUser.username === updatedUser.username) {
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    }
  }

  deleteUser(index: number): void {
    const users = this.getUsers();
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  updateUserByUsername(username: string, updatedUser: any): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.username === username);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    }
  }
  
}
