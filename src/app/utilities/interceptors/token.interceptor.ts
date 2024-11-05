import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userConnected = inject(AuthService).userConnected$;
  const authToken = userConnected.value.token ?? '';
  console.log(userConnected.value);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(authReq);
};
