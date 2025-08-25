import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);

  if (authService.isLoggedIn()){
    console.log('You cannot access this path while logged in.')
    return false;
  } else {
    return true;
  }
};
