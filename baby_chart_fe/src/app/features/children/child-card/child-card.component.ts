import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ChildService } from '../../../../shared/services/child.service';
import { Child } from '../../../../shared/models/child';
import { UserService } from '../../../../shared/services/user.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-child-card',
  imports: [],
  templateUrl: './child-card.component.html',
  styleUrl: './child-card.component.css'
})
export class ChildCardComponent implements OnInit{
  children: WritableSignal<Child[]> = signal<Child[]>([]);
  user = signal<User | null>(null); // should be in service
  
  constructor(private childService: ChildService, private userService: UserService, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.userService.loadCurrentUserIfLoggedIn(this.authService); //get user data (if not, must visit profile or list does not load)
    this.userService.currentUserSubject.subscribe((res) => {
      this.user.set(res); //assign user data to signal for display in html 
      if (res){ //if response successful, update form with returned values (which are assigned to user signal)
       this.childService.indexChildren(this.user()!.id).subscribe((children) => this.children.set(children))
      }
    },
     (error) => {
      console.error(error);
      return null;
    }
  ); 
  }
}
