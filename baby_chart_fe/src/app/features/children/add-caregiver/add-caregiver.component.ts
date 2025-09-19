import { Component, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../shared/models/user';
import { CaregiverService } from '../../../../shared/services/caregiver.service';

@Component({
  selector: 'app-add-caregiver',
  imports: [],
  templateUrl: './add-caregiver.component.html',
  styleUrl: './add-caregiver.component.css'
})
export class AddCaregiverComponent implements OnInit {
  caregivers = signal<User[]>([])

  constructor(private caregiverService: CaregiverService){}

  caregiverForm = new FormGroup({

  })

  ngOnInit(): void {
   this.caregivers.set(this.caregiverService.caregivers); //set caregiver signal with caregiver array
  }
}
