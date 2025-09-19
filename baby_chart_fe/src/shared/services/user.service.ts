import { Injectable, signal } from '@angular/core';
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
user = signal<User | null>(null);
allUsers: User[] = []

  constructor(private http: HttpClient, private router: Router) {}

  getAllUsers(){
    return this.http.get<User[]>(`${environment.apiUrl}/users`); //normal view userblueprinter, no passwords
  }

  assignCurrentUser(): void{
    this.currentUserSubject.subscribe((res) => this.user.set(res)) //assign user data to signal for display in html
  }

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
    this.user!.set(user);
  }

  getBootstrapData() {
    return this.http.get(`${environment.apiUrl}/web/bootstrap`).pipe(
      tap((data: any) => {
        this.setCurrentUser(data.current_user);
      })
    );
  }

  updateUserData(user: User): Observable<User>{
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, user)
  }
}
