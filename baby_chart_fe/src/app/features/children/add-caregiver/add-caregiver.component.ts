import { Component, effect, numberAttribute, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../shared/models/user';
import { CaregiverService } from '../../../../shared/services/caregiver.service';
import { ChildService } from '../../../../shared/services/child.service';
import { Child } from '../../../../shared/models/child';
import { UserService } from '../../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-caregiver',
  imports: [ReactiveFormsModule],
  templateUrl: './add-caregiver.component.html',
  styleUrl: './add-caregiver.component.css'
})
export class AddCaregiverComponent implements OnInit {
  caregivers = signal<User[]>([])
  children = signal<Child[]>([])
  user = []

  constructor(private caregiverService: CaregiverService, private childService: ChildService, private userService: UserService, private matSnackBar: MatSnackBar){}

  caregiverForm = new FormGroup({
    userId: new FormControl<number | null>(null, Validators.required),
    childId: new FormControl<number | null>(null, Validators.required),
  })


 ngOnInit(): void {
   this.userService.currentUserSubject.subscribe((user) => {
    if (user) {
      this.childService.indexChildren(user.id).subscribe((children: Child[]) => {
        this.children.set(children);
      });
    }
  });
  this.userService.getAllUsers().subscribe((allUsers)=> {
    if (allUsers){
      this.caregivers.set(allUsers);
    }
  })
}

addCaregiverHandler(){
  if (this.caregiverForm.valid) {
    //ids from form 
    const userId = Number(this.caregiverForm.value.userId);
    const childId = Number(this.caregiverForm.value.childId);
    console.log('User ID:', userId);
    console.log('Child ID:', childId);

    //select user/child from arrays
    const selectedUser = this.caregivers().find(user => user.id === userId);
    const selectedChild = this.children().find(child => child.id === childId);

    //assign names for use in messages
    const userName = selectedUser?.username ?? 'Unknown User';
    const childName = selectedChild?.child_name ?? 'Unknown Child';

    let userConfirmed = confirm(
      `Are you sure you want to give ${userName} access to view, edit, and delete entries for ${childName}`
    );

    if (userConfirmed){
    //pass ids to create access
    this.caregiverService.addAccessToCaregiver(userId, childId).subscribe({
        next: () => (this.matSnackBar.open(`Caregiver access for ${childName} successfully given to ${userName}`, 'Close'), this.caregiverForm.reset()), 
        error: (err) => console.error('Error adding caregiver access:', err)
      });
    } else {
      this.matSnackBar.open(`${userName} Access to ${childName} denied.`, 'Close'), this.caregiverForm.reset()
    }
  }
 }
}
