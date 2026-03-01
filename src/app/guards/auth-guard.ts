import { CanActivateFn, Router } from '@angular/router';
import { UserAuth } from '../services/user-auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserAuth);
  const router = inject(Router);
  return authService.isLoggedIn() ? true : router.navigateByUrl('/login');
};
