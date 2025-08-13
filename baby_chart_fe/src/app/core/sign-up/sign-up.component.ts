import { Component, signal } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
constructor(private authService: AuthenticationService, private matSnackBar: MatSnackBar){}

  displaySignup = signal<boolean>(false);

  signUpForm = new FormGroup({
    name_first: new FormControl("", [Validators.required]),
    name_last: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("",[Validators.required]),
    password_confirmation: new FormControl("", [Validators.required]),
  })

  toggleSignup(){
    this.displaySignup.set(!this.displaySignup())
  }

  signUpHandler(){
    this.authService.signUp(this.signUpForm.value.name_first!, this.signUpForm.value.name_last!, this.signUpForm.value.email!, this.signUpForm.value.username!, this.signUpForm.value.password!, this.signUpForm.value.password_confirmation!).subscribe({
      next: (res: any) => {
        this.matSnackBar.open("Sign-up successful! You may now use your login credentials!", 'Close')
        this.signUpForm.reset()
      },
      error: (error: any) => {
        this.matSnackBar.open("There was some error during sign-up. Refer to the Credential Requirements, and try again.", 'Close')
        console.error('Sign up error', error.message)
      }
    })
  }
}