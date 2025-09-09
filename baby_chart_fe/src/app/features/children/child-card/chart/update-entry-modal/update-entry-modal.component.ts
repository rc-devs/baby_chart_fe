import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartService } from '../../../../../../shared/services/chart.service';
import { Entry } from '../../../../../../shared/models/entry';

@Component({
  selector: 'app-update-entry-modal',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDialogModule],
  templateUrl: './update-entry-modal.component.html',
  styleUrl: './update-entry-modal.component.css'
})
export class UpdateEntryModalComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<UpdateEntryModalComponent>, private chartService: ChartService, @Inject(MAT_DIALOG_DATA) public data: { childId: number, entry?: Entry }){}

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
      feedingDetails: new FormGroup({
        bottle: new FormControl(false),
        breast: new FormControl(false),
        amount: new FormControl(0, [
          Validators.min(0),
          /* Validators.required */
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

  ngOnInit(): void {
    if (this.data.entry){
      let e = this.data.entry;

      this.newEntryForm.patchValue({
          time: e.time ? new Date(e.time).toISOString() : new Date().toISOString(),
        medicationBool: !!e.medication,
        medicationDetails: {
          medication: e.medication ?? ''
        },
        bath: e.bath ?? false,
        comments: e.comments ?? '',
        feeding: !!e.feeding,
        feedingDetails: {
          bottle: e.feeding?.bottle ?? false,
          breast: e.feeding?.breast ?? false,
          amount: e.feeding?.amount ?? 0
        },
        diaper: !!e.diaper,
        diaperDetails: {
          dirty: e.diaper?.dirty ?? false,
          wet: e.diaper?.wet ?? false,
          color: e.diaper?.color ?? '',
          consistency: e.diaper?.consistency ?? '',
          comments: e.diaper?.comments ?? ''
        }
      })
    }
  }

  submitEntryUpdateHandler(){
  
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
