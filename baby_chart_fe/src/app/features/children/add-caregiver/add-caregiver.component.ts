import { Component, effect, numberAttribute, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../shared/models/user';
import { CaregiverService } from '../../../../shared/services/caregiver.service';
import { ChildService } from '../../../../shared/services/child.service';
import { Child } from '../../../../shared/models/child';
import { UserService } from '../../../../shared/services/user.service';

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

  constructor(private caregiverService: CaregiverService, private childService: ChildService, private userService: UserService){}

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
    const userId = Number(this.caregiverForm.value.userId);
    const childId = Number(this.caregiverForm.value.childId);

    console.log('User ID:', userId);
    console.log('Child ID:', childId);

    this.caregiverService.addAccessToCaregiver(userId, childId).subscribe({
        next: () => console.log('Caregiver access added successfully'),
        error: (err) => console.error('Error adding caregiver access:', err)
      });
  } else {
    console.log('there was some error')
  }
 }
}
