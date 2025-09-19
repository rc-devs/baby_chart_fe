import { Component, effect, OnInit, signal } from '@angular/core';
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
    username: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    childName: new FormControl(null, Validators.required),
    childId: new FormControl(null, Validators.required),
  })


 ngOnInit(): void {
   this.userService.currentUserSubject.subscribe((user) => {
    if (user) {
      this.childService.indexChildren(user.id).subscribe((children: Child[]) => {
        this.children.set(children);
      });
    }
  });
  this.caregivers.set(this.caregiverService.caregivers);
}

}
