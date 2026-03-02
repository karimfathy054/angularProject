import { Injectable } from '@angular/core';
import { UsersService } from './users-service';
import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserAuth {
  fakeToken = 'token1234';
  constructor(private usersService: UsersService) {}
  register(user: IUser) {
    this.usersService.addUser(user);
  }
  login(email: string, password: string) {
    const user = this.usersService.getUserByEmail(email);
    if (user && user.password === password) {
      localStorage.setItem('token', JSON.stringify({ email: user.email }));
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isAdmin() {
    const token = this.getToken();
    if (!token) return false;
    return this.usersService.getUserByEmail(JSON.parse(token).email)?.role === 'admin';
  }
}
