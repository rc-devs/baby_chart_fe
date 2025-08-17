import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-edit-user',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user = signal<User | null>(null); // should be in service

  constructor(private userService: UserService, private authService: AuthenticationService){}

  updateUserDataForm = new FormGroup({
    user_name: new FormControl ( this.user()?.username, Validators.required),
    email: new FormControl ( this.user()?.email, Validators.required),
    name_first: new FormControl ( this.user()?.name_first, Validators.required),
    name_last: new FormControl ( this.user()?.name_last, Validators.required),
  })

  // should be in service
  ngOnInit(): void {
    this.userService.loadCurrentUserIfLoggedIn(this.authService) //get user data
    this.userService.currentUserSubject.subscribe((res) => {
      this.user.set(res); //assign user data to signal for display in html 
      if (res){ //if response successful, update form with returned values (which are assigned to user signal)
        this.updateUserDataForm.patchValue(
          {
           user_name: this.user()?.username,
           email: this.user()?.email,
           name_first: this.user()?.name_first,
           name_last: this.user()?.name_last,
          }
        )
      }
    }); 
  }
  

  editUserHandler(){
    
  }
}
