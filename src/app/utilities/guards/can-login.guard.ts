import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const canLoginGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if (authService.userConnected().email) return false;
  return true;
};

export const canRegisterGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if (authService.userConnected().email) return false;
  return true;
};
