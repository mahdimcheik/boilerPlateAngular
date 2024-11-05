import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((err: any) => {
      messageService.add({
        severity: 'error',
        summary: 'Attention ! ',
        detail: err.error?.message ?? 'Erreur coté serveur',
      });

      return throwError(() => err);
    })
  );
};
