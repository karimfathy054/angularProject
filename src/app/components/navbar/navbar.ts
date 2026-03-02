import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuth } from '../../services/user-auth';
import { UsersService } from '../../services/users-service';
import { ThemeService } from '../../services/theme-service';

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
    private router: Router,
    private themeService: ThemeService,
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
    this.router.navigate(['']);
  }
  isAdmin() {
    return this.authService.isAdmin();
  }
  get theme() {
    return this.themeService.isDarkMode();
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
