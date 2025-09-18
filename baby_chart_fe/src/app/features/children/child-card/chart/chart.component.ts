import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ChartService } from '../../../../../shared/services/chart.service';
import { Chart } from '../../../../../shared/models/chart';
import { Child } from '../../../../../shared/models/child';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EntryModalComponent } from './entry-modal/entry-modal.component';
//import { Entry } from '../../../../../shared/models/entry';
import { UpdateEntryModalComponent } from './update-entry-modal/update-entry-modal.component';
import { EntryNoDiaperFeedingAttributes } from '../../../../../shared/models/entryNoDiaperFeedingAttributes';

@Component({
  selector: 'app-chart',
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  @Input() child: Child | null = null; //child data from html passed as 'c'
  chart: WritableSignal<Chart | null> = signal<Chart | null>(null);
  //entries: WritableSignal<Entry[]> = signal<Entry[]>([]);
  returnedEntries: WritableSignal<EntryNoDiaperFeedingAttributes[]> = signal<
    EntryNoDiaperFeedingAttributes[]
  >([]);

  constructor(private chartService: ChartService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.chart.set(this.child?.chart!); //sets chart on init

    if (this.child?.id) { //if child has id
      this.chartService
        .indexEntriesByChildId(this.child.id) //index (get chart) using service, subscribe to results
        .subscribe((result) => {
         // this.entries.set(result);
          this.returnedEntries.set(result);
          console.log(result); //remove when done, will take up a lot of room
        });
    }
  }

  openEntryModal() {
    const dialogRef = this.dialog.open(EntryModalComponent, {
      height: '400px',
      width: '600px',
      data: { childId: this.child!.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        //const newEntryList = [...this.entries(), result]; //spread old entries and add new entry (result)
        const newEntryList = [...this.returnedEntries(), result]; //spread old entries and add new entry (result)
        console.log(newEntryList);
        //this.entries.set(newEntryList); // set to signal triggers change detection
        this.returnedEntries.set(newEntryList); // set to signal triggers change detection
        //console.log(this.entries());
        console.log(this.returnedEntries());
      }
    });
  }

  openUpdateModal(e: EntryNoDiaperFeedingAttributes) {
    console.log(e);
    const dialogRef = this.dialog.open(UpdateEntryModalComponent, {
      height: '400px',
      width: '600px',
      data: {
        childId: this.child!.id,
        entry: e,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        /* const updatedEntries = this.entries().map((entry) =>
          entry.id === result.id ? result : entry
        ); */

        const updatedEntries = this.returnedEntries().map((entry) =>
          entry.id === result.id ? result : entry
        );
        //this.entries.set(updatedEntries); // set to signal triggers change detection
        this.returnedEntries.set(updatedEntries); // set to signal triggers change detection
        console.log(result);
        //console.log(this.entries);
        console.log(this.returnedEntries)
        console.log('Entry successfully updated');
      }
    });
  }

  showChartHandler() {
    if (!this.child?.id) {
      console.error('Child ID is missing');
      return;
    }

    console.log('Fetching chart for child ID:', this.child.id);

    this.chartService.showChartByChildId(this.child.id).subscribe({
      next: (res) => {
        this.chart.set(res);
        console.log('Chart loaded successfully:', res);
      },
      error: (err) => {
        console.error('Error loading chart:', err);
      },
    });
  }

  deleteEntryHandler(e: EntryNoDiaperFeedingAttributes) {
    console.log(e);

    let userConfirmed = confirm(
      `Are you sure you want to delete entry ${e.id!}`
    );

    if (userConfirmed) {
      this.chartService.deleteEntry(this.child!.id, e.id!).subscribe({
        next: () => {
          const updatedEntries = this.returnedEntries().filter(
            (entry) => entry.id !== e.id
          ); //get all the entries from the array that do not equal the submitted
          console.log(updatedEntries);
          //this.entries.set(updatedEntries); //change detection
          this.returnedEntries.set(updatedEntries); //change detection
          console.log(this.returnedEntries);
          console.log('Entry successfully deleted');
        },
        error: (err) => {
          console.error('Error updating chart:', err);
        },
      });
    }
  }
}
