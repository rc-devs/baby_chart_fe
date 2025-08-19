import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ChildService } from '../../../../shared/services/child.service';
import { Child } from '../../../../shared/models/child';
import { UserService } from '../../../../shared/services/user.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { User } from '../../../../shared/models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-child-card',
  imports: [ReactiveFormsModule],
  templateUrl: './child-card.component.html',
  styleUrl: './child-card.component.css'
})
export class ChildCardComponent implements OnInit{
  children: WritableSignal<Child[]> = signal<Child[]>([]);
  user = signal<User | null>(null); // should be in service
  displayEditCard = signal<boolean>(false);
  childToEdit: Child | null = null;

  constructor(private childService: ChildService, private userService: UserService, private authService: AuthenticationService){}

  editChildForm = new FormGroup({
    child_name: new FormControl ('', [Validators.required]),
    date_of_birth: new FormControl (null, [Validators.required])
  })

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

  displayChildToEdit(c: Child){
    this.displayEditCard.set(!this.displayEditCard());
    this.childToEdit = c

    this.editChildForm.patchValue({
      child_name: c.child_name,
    })
  }

  cancelEditHandler(){
    this.displayEditCard.set(!this.displayEditCard());
  }

  deleteHandler(child_name:string, id:number){
    //include confirm as it is a destructive action
    confirm(`This action cannot be undone. Are you sure you want to delete ${child_name}?`)

    //submit child id to backend, on response, refresh children, reset displayEditCard
    this.childService.deleteChild(id).subscribe({
    next: (child) => {
      console.log(`${child} deleted`);

      this.childService.indexChildren(this.user()!.id).subscribe({
        next: (children) => {
          this.children.set(children);
          this.displayEditCard.set(!this.displayEditCard());
        },
        error: (err) => console.error('Error fetching children:', err),
      });
    },
    error: (err) => console.error('Error deleting child:', err),
  });
   }

  editChildHandler(child_id: number){
    this.childService.editChild(this.editChildForm.value.child_name!, this.editChildForm.value.date_of_birth!, child_id).subscribe({
      next: (updateChild) => {
        console.log(updateChild) 
        this.editChildForm.reset(); // reset form (redundant on display, possibly dangerous without if user submits empty form?)
         this.displayEditCard.set(!this.displayEditCard()); 
      },
      error(err){
        alert("There was some sort of error")
        console.log(err)
      }
    })
  }
    // if success, route to current-children
}
