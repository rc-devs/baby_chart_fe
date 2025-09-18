import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CaregiverService {
  caregivers = signal<User[]>([])
  constructor() { }
}
