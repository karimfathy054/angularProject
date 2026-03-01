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
    console.log('lol', email, password);
    const user = this.usersService.getUserByEmail(email);
    console.log('lol', user);
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
    console.log('lol', !!localStorage.getItem('token'));

    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
