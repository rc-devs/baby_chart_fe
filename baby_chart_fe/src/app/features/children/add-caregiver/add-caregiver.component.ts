import { Component, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-add-caregiver',
  imports: [],
  templateUrl: './add-caregiver.component.html',
  styleUrl: './add-caregiver.component.css'
})
export class AddCaregiverComponent {

  caregiverForm = new FormGroup({

  })
}
