import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../../services/user-auth';
import { IUser } from '../../../models/iuser';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  constructor(
    private router: Router,
    private authService: UserAuth,
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newUser: IUser = {
        id: Date.now(),
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        password: form.value.password,
        role: 'user', // default role
      };

      this.authService.register(newUser);
      // Auto-login or just navigate to login? We'll just navigate to login
      this.router.navigate(['/login']);
    }
  }
}
