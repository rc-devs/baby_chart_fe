import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartService } from '../../../../../../shared/services/chart.service';
import { Entry } from '../../../../../../shared/models/entry';

@Component({
  selector: 'app-entry-modal',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './entry-modal.component.html',
  styleUrl: './entry-modal.component.css'
})
export class EntryModalComponent {

  constructor(public dialogRef: MatDialogRef<EntryModalComponent>, private chartService: ChartService, @Inject(MAT_DIALOG_DATA) public data: { childId: number }
  ){}

  newEntryForm = new FormGroup({
     time: new FormControl(new Date().toISOString(), Validators.required), // or time when submitted
     medicationBool: new FormControl(false),
     medicationDetails: new FormGroup({
      medication: new FormControl('', /* Validators.required */),
     }),
     bath: new FormControl(false),
     comments: new FormControl(''), 
     feeding: new FormControl(false),
     //new formGroup (wowzers, a different group of the form)
      feeding_attributes: new FormGroup({
        bottle: new FormControl(false),
        breast: new FormControl(false),
        amount: new FormControl(0, [
          Validators.min(0),
          /* Validators.required */
        ])
      }),
    diaper: new FormControl(false),
      diaper_attributes: new FormGroup({
        dirty: new FormControl(false),
        wet: new FormControl(false),
        color: new FormControl(''),
        consistency: new FormControl(''),
        comments: new FormControl('')
      })
    }
  )

  //this needs to send to chart or to entry service right??
  submitEntryHandler(): void{
    if (this.newEntryForm.valid){
      const entryValue = this.newEntryForm.value;

    // i feel like making the reactive form then assigning the values to new variables defetes the purpose of the form...
    const entry = {
      time: new Date(entryValue.time ?? new Date()),
      medication: entryValue.medicationBool ? (entryValue.medicationDetails?.medication ?? null) : null,
      bath: entryValue.bath ?? false,
      comments: entryValue.comments ?? '',
      feeding: entryValue.feeding ? {
        bottle: entryValue.feedingDetails?.bottle ?? false,
        breast: entryValue.feedingDetails?.breast ?? false,
        amount: entryValue.feedingDetails?.amount ?? 0
      } : null,
      diaper: entryValue.diaper ? {
        dirty: entryValue.diaperDetails?.dirty ?? false,
        wet: entryValue.diaperDetails?.wet ?? false,
        color: entryValue.diaperDetails?.color ?? '',
        consistency: entryValue.diaperDetails?.consistency ?? '',
        comments: entryValue.diaperDetails?.comments ?? ''
      } : null
    };

    console.log(entry)

      this.chartService.createEntry(this.data.childId, entry as Entry).subscribe({
        next: (res) => {
          this.dialogRef.close(res); // return created entry to parent
        },
        error: (err) => {
          console.error('Error submitting entry:', err);
        }
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
