import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

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
