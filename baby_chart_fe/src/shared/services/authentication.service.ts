import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(){
    // set token to storage
  }

  getToken(){
    // get token from storage
  }
}
