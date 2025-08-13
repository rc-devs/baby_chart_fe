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

  signUp(name_first: string, name_last: string, email: string, username: string, password:string, password_confirmation:string){
    return this.http.post(`${environment.apiUrl}/users`, {
      name_first,
      name_last,
      email, 
      username,
      password, 
      password_confirmation
    })
  }

  login(email: string, password: string): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${environment.apiUrl}/login`, {
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

   isLoggedIn(){
    return !!this.getToken() // !! converts to a boolean wowzers
  }

  logout(){
    localStorage.removeItem('authToken');
		this.tokenSubject.next(null);
		//this.router.navigate(['navbar'])
  }
}
