import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email:string, password:string): Observable<{token: string}>{
    return this.http.post<{token: string}>('http://localhost:3000/login', {
      email,
      password
    })
  }

  // set token

  getToken(){
    // get token from storage
  }
}
