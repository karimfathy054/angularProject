import { CanActivateFn } from '@angular/router';
import { UserAuth } from '../services/user-auth';
import { inject } from '@angular/core';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserAuth);
  return authService.isAdmin();
};
