import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CaregiverService {
  caregivers: User[] =([{id: 1,
    name_first: 'ya mum',
    name_last: "jones",
    email: 'some email', 
    username: 'a username'}]) //should this be a signal or subject or is this fine?
  constructor() { }

  //http request here set caregivers on response
}
