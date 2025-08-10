import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = (inject(AuthenticationService));
  const authToken = authService.getToken();

  const authReq = authToken 
    ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    })
    : req;
  return next(authReq);
};
