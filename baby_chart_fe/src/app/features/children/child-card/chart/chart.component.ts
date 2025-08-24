import { Component, Input, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ChartService } from '../../../../../shared/services/chart.service';
import { Chart } from '../../../../../shared/models/chart';
import { Child } from '../../../../../shared/models/child';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit, OnChanges{
  @Input() child: Child | null = null;
  chart: WritableSignal<Chart | null> = signal<Chart | null>(null);

  constructor(private chartService: ChartService){}

  ngOnInit(): void {
     console.log("child: ", this.child)
     this.chart.set(this.child?.chart!)
     console.log("Chart:", this.chart())
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['child'] && this.child?.chart) {
      this.chart.set(this.child.chart);
      console.log("Chart updated:", this.chart());
    }
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
}
