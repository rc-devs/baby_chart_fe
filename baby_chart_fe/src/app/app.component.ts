import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'baby_chart_fe';

  constructor(public authService: AuthenticationService){}
}
