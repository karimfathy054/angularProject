import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { users } from '../db';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: IUser[] = users;

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  addUser(user: IUser) {
    this.users.push(user);
  }

  updateUser(user: IUser) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
