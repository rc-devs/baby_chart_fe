import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(email:string, password:string): Observable<{token: string}>{
    return this.http.post<{token: string}>('http://localhost:3000/login', {
      email,
      password
    })
  }

  // set token invoked in login component
  setToken(token: string){
    localStorage.setItem('authToken', token)
    this.tokenSubject.next(token)
  }

  // get token from storage
  getToken(){
    return localStorage.getItem('authToken')
  }
}
