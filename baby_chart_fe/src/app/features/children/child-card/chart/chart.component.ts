import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
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
export class ChartComponent implements OnInit {
  @Input() child: Child | null = null;
  
  chart: WritableSignal<Chart | null> = signal<Chart | null>(null);

  constructor( private chartService: ChartService ){}

  ngOnInit(): void {
     console.log("child: ", this.child)
     this.chart.set(this.child?.chart!)
     console.log("Chart:", this.chart())
  }

  showChartHandler(){
    console.log('shochartHandler fire')
   
    console.log(this.child)
    console.log(this.child?.chart) // anything involving chart shows up as undefined, despite chart being created when child is created
    console.log(this.child?.chart.id)
    console.log(this.child?.chart.entries)
    // need to get chart id from child
    this.chartService.showChart(this.chart()!.id).subscribe((res) => { 
      console.log('shochart fire')
      if (res){ 
        this.chart.set(res)
        console.log(res)
      }
    })

    
  }
}
