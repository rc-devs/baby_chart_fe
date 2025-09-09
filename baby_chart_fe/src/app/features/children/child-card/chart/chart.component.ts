import { Component, Input, OnChanges, OnInit, Signal, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ChartService } from '../../../../../shared/services/chart.service';
import { Chart } from '../../../../../shared/models/chart';
import { Child } from '../../../../../shared/models/child';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EntryModalComponent } from './entry-modal/entry-modal.component';
import { Entry } from '../../../../../shared/models/entry';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chart',
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit, OnChanges{
  @Input() child: Child | null = null; //child data from html passed as 'c'
  chart: WritableSignal<Chart | null> = signal<Chart | null>(null);
  entries: WritableSignal<Entry[]> = signal<Entry[]>([]);

  constructor(private chartService: ChartService, private dialog: MatDialog){}

  ngOnInit(): void {
     console.log("child: ", this.child)
     this.chart.set(this.child?.chart!)  
     console.log("Chart:", this.chart())

     if (this.child?.id) {
    this.chartService.indexEntriesByChildId(this.child.id).subscribe(entries => {
      this.entries.set(entries);
      console.log(entries) //remove when done, will take up a lot of room
    });
  }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['child'] && this.child?.chart) {
      this.chart.set(this.child.chart);
      console.log("Chart updated:", this.chart());
    }
  }

  openEntryModal(){
    const dialogRef = this.dialog.open(EntryModalComponent, {
      height: '400px',
      width: '600px',
      data: {childId: this.child!.id}
    });

    // needs to submit to service then to entries controller?
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.chart()?.entries.push({ ...result, id: Date.now() });
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
    }
  });
 }

 deleteEntryHandler(e: Entry){
  console.log(e)

  let userConfirmed= confirm(`Are you sure you want to delete entry ${e.id!}`);

  if (userConfirmed){
    this.chartService.deleteEntry(this.child!.id, e.id!).subscribe({
      next: (res) => { 
        console.log('Entry successfully deleted');
      },
      error: (err) => {
        console.error('Error deleting chart:', err);
      }
    });
  }
 }
}
