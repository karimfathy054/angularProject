import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../../services/user-auth';
import { IUser } from '../../../models/iuser';
import { confirmedPasswordValidator } from '../../../customValidators/confirmedPasswordValidator';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm implements OnInit {
  userRegister: FormGroup;
  constructor(
    private router: Router,
    private authService: UserAuth,
    private formBuilder: FormBuilder,
  ) {
    this.userRegister = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.userRegister.get('password')?.valueChanges.subscribe(() => {
      this.userRegister.addControl('confirmPassword', new FormControl('', Validators.required));
      this.userRegister.addValidators(confirmedPasswordValidator());
    });
  }

  get firstName() {
    return this.userRegister.get('firstName');
  }

  get lastName() {
    return this.userRegister.get('lastName');
  }

  get email() {
    return this.userRegister.get('email');
  }

  get password() {
    return this.userRegister.get('password');
  }

  get confirmPassword() {
    return this.userRegister.get('confirmPassword');
  }

  onSubmit() {
    if (this.userRegister.valid) {
      const newUser: IUser = {
        id: Date.now(),
        firstName: this.userRegister.value.firstName,
        lastName: this.userRegister.value.lastName,
        email: this.userRegister.value.email,
        password: this.userRegister.value.password,
        role: 'user',
      };

      this.authService.register(newUser);
      this.router.navigate(['/login']);
    }
  }
}
