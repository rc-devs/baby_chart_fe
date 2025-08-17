import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from '../shared/auth-token.interceptor';
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { firstValueFrom, of } from 'rxjs';
import { User } from '../shared/models/user';

export function initializeUserData(
  userService: UserService,
  authService: AuthenticationService
) {
  return () => {
    if (!authService.isLoggedIn()) {
      return Promise.resolve(null);
    }

    return firstValueFrom(userService.getBootstrapData()).then(
      (user: User) => {
        userService.setCurrentUser(user); 
        console.log('User loaded:', user);
      },
      (error) => {
        console.error('Failed to load user, logging out.');
        authService.logout();
      }
    );
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    {
			provide: APP_INITIALIZER,
			useFactory: initializeUserData,
			deps: [UserService, AuthenticationService],
			multi: true,
		},
  ],
};
