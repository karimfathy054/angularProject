import { CanActivateChildFn, Router } from '@angular/router';
import { UserAuth } from '../services/user-auth';
import { inject } from '@angular/core';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(UserAuth);
  const router = inject(Router);
  return authService.isLoggedIn() ? true : router.navigateByUrl('/login');
};
