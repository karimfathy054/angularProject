import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuth } from '../../services/user-auth';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private authService: UserAuth,
    private usersService: UsersService,
  ) {}
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getUserName() {
    const token = this.authService.getToken();
    if (!token) return '';
    return this.usersService.getUserByEmail(JSON.parse(token).email)?.firstName;
  }
  logout() {
    this.authService.logout();
  }
}
