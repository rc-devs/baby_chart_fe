import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  imports: [RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  user = signal<User | null>(null);
  userId!: number;

  constructor(private userService: UserService, private router: Router, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.userService.loadCurrentUserIfLoggedIn(this.authService) //get user data
    this.userService.currentUserSubject.subscribe((res) => this.user.set(res)) //assign user data to signal for display in html
  }
}
