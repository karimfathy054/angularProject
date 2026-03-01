import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Needed for *ngIf if you're not using the new @if syntax
import { UserAuth } from '../../../services/user-auth';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  constructor(
    private router: Router,
    private authService: UserAuth,
  ) {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.login(email, password);
      this.router.navigate(['/']);
    }
  }
}
