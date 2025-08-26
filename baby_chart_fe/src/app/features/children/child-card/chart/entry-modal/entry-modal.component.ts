import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-entry-modal',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './entry-modal.component.html',
  styleUrl: './entry-modal.component.css'
})
export class EntryModalComponent {

  constructor(public dialogRef: MatDialogRef<EntryModalComponent>) {}

  newEntryForm = new FormGroup({
     time: new FormControl(new Date().toISOString(), Validators.required), // or time when submitted
     medication: new FormControl(''),
     bath: new FormControl(false),
     comments: new FormControl(''), 
     feeding: new FormControl(false),
     //new formGroup (wowzers, a different group of the form)
      feedingDetails: new FormGroup({
        bottle: new FormControl(false),
        breast: new FormControl(false),
        amount: new FormControl<number | null>(null, [
          Validators.min(0),
          Validators.required
        ])
      }),
    diaper: new FormControl(false),
      diaperDetails: new FormGroup({
        dirty: new FormControl(false),
        wet: new FormControl(false),
        color: new FormControl(''),
        consistency: new FormControl(''),
        comments: new FormControl('')
      })
    }
  )

  submitEntryHandler(): void{
    if (this.newEntryForm.valid){
      this.dialogRef.close(this.newEntryForm.value)
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
