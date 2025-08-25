import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router)

  if (authService.isLoggedIn()){
    alert('You cannot access this path while logged in. Returning you to dashboard')
    router.navigate(['/dashboard'])
    return false;
  } else {
    return true;
  }
};
