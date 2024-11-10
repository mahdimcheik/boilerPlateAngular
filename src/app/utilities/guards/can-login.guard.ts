import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const canNotLoginGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if (authService.userConnected().email) return false;
  return true;
};

export const canNotRegisterGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if (authService.userConnected().email) return false;
  return true;
};
