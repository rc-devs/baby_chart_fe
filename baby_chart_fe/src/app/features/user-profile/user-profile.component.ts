import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  user = signal<User | null>(null);
  userId!: number;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe((res) => this.user.set(res)) 
    console.log(this.userService.currentUserSubject)
    this.userService.currentUserSubject.subscribe(console.log)
  }
}
