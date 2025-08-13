import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthenticationService, private router: Router){}

  loginForm = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  loginHandler() {
  this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
    next: (res: any) => {
      if (res && res.token) {
        this.authService.setToken(res.token);
        // this.router.navigate(['/dashboard']) //not currently a route
      } else {
        console.error('Invalid login response:', res);
        alert("Login failed. Please check your credentials.");
      }
    },
    error: (error: any) => {
      alert("Login error. Ensure you are using a valid username and password.");
      console.error('Login error', error);
    }
  });
}
}
