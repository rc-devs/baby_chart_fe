import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../shared/models/user';
import { CaregiverService } from '../../../../shared/services/caregiver.service';

@Component({
  selector: 'app-add-caregiver',
  imports: [ReactiveFormsModule],
  templateUrl: './add-caregiver.component.html',
  styleUrl: './add-caregiver.component.css'
})
export class AddCaregiverComponent implements OnInit {
  caregivers = signal<User[]>([])

  constructor(private caregiverService: CaregiverService){}

  caregiverForm = new FormGroup({
    username: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    childName: new FormControl(null, Validators.required),
    childId: new FormControl(null, Validators.required),
  })

  ngOnInit(): void {
   this.caregivers.set(this.caregiverService.caregivers); //set caregiver signal with caregiver array
  }
}
