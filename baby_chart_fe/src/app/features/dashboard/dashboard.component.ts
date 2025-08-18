import { Component } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  constructor(public authService: AuthenticationService){}

}
