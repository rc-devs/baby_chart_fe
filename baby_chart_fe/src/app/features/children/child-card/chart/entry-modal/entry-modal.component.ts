import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartService } from '../../../../../../shared/services/chart.service';
import { Entry } from '../../../../../../shared/models/entry';

@Component({
  selector: 'app-entry-modal',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  templateUrl: './entry-modal.component.html',
  styleUrl: './entry-modal.component.css',
})
export class EntryModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EntryModalComponent>,
    private chartService: ChartService,
    @Inject(MAT_DIALOG_DATA) public data: { childId: number }
  ) {}

  newEntryForm = new FormGroup({
    time: new FormControl(new Date().toISOString(), Validators.required), // or time when submitted
    medicationBool: new FormControl(false),
    medicationDetails: new FormGroup({
      medication: new FormControl('' /* Validators.required */),
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
      ]),
    }),
    diaper: new FormControl(false),
    diaper_attributes: new FormGroup({
      dirty: new FormControl(false),
      wet: new FormControl(false),
      color: new FormControl(''),
      consistency: new FormControl(''),
      comments: new FormControl(''),
    }),
  });

  submitEntryHandler(): void {
    if (this.newEntryForm.valid) {
      const entryValue = this.newEntryForm.value;

      // new variable needed to avoid runtime error i guess
      const entry = {
        time: new Date(entryValue.time ?? new Date()),
        medication: entryValue.medicationBool
          ? entryValue.medicationDetails?.medication ?? null
          : null,
        bath: entryValue.bath ?? false,
        comments: entryValue.comments ?? '',
        feeding_attributes: entryValue.feeding
          ? {
              bottle: entryValue.feeding_attributes?.bottle ?? false,
              breast: entryValue.feeding_attributes?.breast ?? false,
              amount: entryValue.feeding_attributes?.amount ?? 0,
            }
          : null,
        diaper_attributes: entryValue.diaper
          ? {
              dirty: entryValue.diaper_attributes?.dirty ?? false,
              wet: entryValue.diaper_attributes?.wet ?? false,
              color: entryValue.diaper_attributes?.color ?? '',
              consistency: entryValue.diaper_attributes?.consistency ?? '',
              comments: entryValue.diaper_attributes?.comments ?? '',
            }
          : null,
      };

      console.log(entry);

      //submits to chart service and subscribes to response
      this.chartService
        .createEntry(this.data.childId, entry as Entry)
        .subscribe({
          next: (res) => {
            this.dialogRef.close(res); // return created entry to parent
          },
          error: (err) => {
            console.error('Error submitting entry:', err);
          },
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
