import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-child',
  imports: [ReactiveFormsModule],
  templateUrl: './add-child.component.html',
  styleUrl: './add-child.component.css'
})
export class AddChildComponent {

  addChildForm = new FormGroup({
    child_name: new FormControl ('', [Validators.required]),
    date_of_birth: new FormControl (null, [Validators.required])
  })
}
