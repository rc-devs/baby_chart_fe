import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  
  loadCurrentUserIfLoggedIn(authService: AuthenticationService): Promise<User | null> {
  if (!authService.isLoggedIn()) {
    return Promise.resolve(null);
  }

  return firstValueFrom(this.getBootstrapData()).then(
    (user: User) => {
      this.setCurrentUser(user); //set currentUserSubject via method
      return user;
    },
    (error) => {
      console.error('Failed to load user');
      this.router.navigate(['/dashboard']);
      return null;
    }
  );
}

  clearCurrentUser(){
    this.currentUserSubject.next(null);
  }

  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  getBootstrapData() {
    return this.http.get(`${environment.apiUrl}/web/bootstrap`).pipe(
      tap((data: any) => {
        this.setCurrentUser(data.current_user);
      })
    );
  }
}
