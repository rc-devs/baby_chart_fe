import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${environment.apiUrl}/login`, {
    email,
    password
   },
   { headers: { 'Content-Type': 'application/json' } }
  ) 
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

   isLoggedIn(){
    return !!this.getToken() // !! converts to a boolean wowzers
  }

  logout(){
    localStorage.removeItem('token');
		this.tokenSubject.next(null);
		//this.router.navigate(['navbar'])
  }
}
