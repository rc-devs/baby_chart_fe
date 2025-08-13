import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AuthenticationService } from '../shared/services/authentication.service';
import { SignUpComponent } from './core/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, SignUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'baby_chart_fe';

  constructor(public authService: AuthenticationService){}
}
