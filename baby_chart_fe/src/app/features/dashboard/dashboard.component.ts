import { Component } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  constructor(public authService: AuthenticationService, private userService: UserService){}
  
  ngOnInit(): void {
    this.userService.loadCurrentUserIfLoggedIn(this.authService)// get user data
  } 

}
