import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from '../models/child';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private http: HttpClient, private router: Router) { }

  createChild(child_name:string, date_of_birth:Date){
    return this.http.post<Child>(`${environment.apiUrl}/children`, {
      child_name,
      date_of_birth
    })
  }

  indexChildren(user_id: number){
     return this.http.get<Child[]>(`${environment.apiUrl}/children?id=${user_id}?include=chart`);
  }

  deleteChild(child_id: number){
  return this.http.delete<Child>(`${environment.apiUrl}/children/${child_id}`);
  }

  editChild(child_name:string, date_of_birth:Date, child_id:number){
    return this.http.put<Child>(`${environment.apiUrl}/children/${child_id}`, {
      child_name,
      date_of_birth
    })
  }
}
