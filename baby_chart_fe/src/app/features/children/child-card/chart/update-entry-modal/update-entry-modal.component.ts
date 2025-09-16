import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartService } from '../../../../../../shared/services/chart.service';
import { Entry } from '../../../../../../shared/models/entry';
import { EntryNoDiaperFeedingAttributes } from '../../../../../../shared/models/entryNoDiaperFeedingAttributes';

@Component({
  selector: 'app-update-entry-modal',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDialogModule],
  templateUrl: './update-entry-modal.component.html',
  styleUrl: './update-entry-modal.component.css'
})
export class UpdateEntryModalComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<UpdateEntryModalComponent>, private chartService: ChartService, @Inject(MAT_DIALOG_DATA) public data: { childId: number, entry?: EntryNoDiaperFeedingAttributes }){}

  updateEntryForm = new FormGroup({
     time: new FormControl(new Date().toISOString(), Validators.required), // or time when submitted
     medicationBool: new FormControl(false),
     medicationDetails: new FormGroup({
      medication: new FormControl('', /* Validators.required */),
     }),
     bath: new FormControl(false),
     comments: new FormControl(''),
     //new formGroup (wowzers, a different group of the form) 
     feedingBool: new FormControl(false),
     feeding: new FormGroup({
        bottle: new FormControl(false),
        breast: new FormControl(false),
        amount: new FormControl(0, [
          Validators.min(0),
          /* Validators.required */
        ])
      }),
    diaperBool: new FormControl(false),
    diaper: new FormGroup({
        dirty: new FormControl(false),
        wet: new FormControl(false),
        color: new FormControl(''),
        consistency: new FormControl(''),
        comments: new FormControl('')
      })
    }
  )

  ngOnInit(): void {
    if (this.data.entry){
      let e = this.data.entry;

      this.updateEntryForm.patchValue({
          time: e.time ? new Date(e.time).toISOString() : new Date().toISOString(),
        medicationBool: !!e.medication,
        medicationDetails: {
          medication: e.medication ?? ''
        },
        bath: e.bath ?? false,
        comments: e.comments ?? '',
        feedingBool: !!e.feeding,
        feeding: {
          bottle: e.feeding?.bottle ?? false,
          breast: e.feeding?.breast ?? false,
          amount: e.feeding?.amount ?? 0
        },
        diaperBool: !!e.diaper,
        diaper: {
          dirty: e.diaper?.dirty ?? false,
          wet: e.diaper?.wet ?? false,
          color: e.diaper?.color ?? '',
          consistency: e.diaper?.consistency ?? '',
          comments: e.diaper?.comments ?? ''
        }
      })
    }
  }

  submitEntryUpdateHandler(): void{
    if (this.updateEntryForm.valid){
      const entryValue = this.updateEntryForm.value;
      //this.dialogRef.close(this.newEntryForm.value)

    //assign as entry to avoid runtime issues i guess
    const updatedEntry = {
     /*  time: new Date(entryValue.time ?? new Date()), */
      medication: entryValue.medicationBool ? (entryValue.medicationDetails?.medication ?? null) : null,
      bath: entryValue.bath ?? false,
      comments: entryValue.comments ?? '',
      feeding_attributes: entryValue.feedingBool ? {
        bottle: entryValue.feeding?.bottle ?? false,
        breast: entryValue.feeding?.breast ?? false,
        amount: entryValue.feeding?.amount ?? 0
      } : {_destroy: true },
      diaper_attributes: entryValue.diaperBool ? {
        dirty: entryValue.diaper?.dirty ?? false,
        wet: entryValue.diaper?.wet ?? false,
        color: entryValue.diaper?.color ?? '',
        consistency: entryValue.diaper?.consistency ?? '',
        comments: entryValue.diaper?.comments ?? ''
      } : {_destroy: true },
    }; 

     console.log(updatedEntry) 

      this.chartService.updateEntry(this.data.childId, this.data.entry!.id!, updatedEntry as Entry).subscribe({
        next: (res) => {
          this.dialogRef.close(res); // return created entry to parent
        },
        error: (err) => {
          console.error('Error updating entry:', err);
        }
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
