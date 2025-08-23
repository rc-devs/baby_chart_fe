import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ChartService } from '../../../../../shared/services/chart.service';
import { Chart } from '../../../../../shared/models/chart';
import { UserService } from '../../../../../shared/services/user.service';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';
import { ChildService } from '../../../../../shared/services/child.service';
import { Child } from '../../../../../shared/models/child';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @Input() child: Child | null = null;
  
  chart: WritableSignal<Chart | null> = signal<Chart | null>(null);

  constructor( private chartService: ChartService, private userService: UserService, private authService: AuthenticationService ){}

  showChartHandler(){
    // need to get chart id from child

    this.chartService.showChart(this.child!.chart.id).subscribe((res) => { 
      if (res){ 
        this.chart.set(res)
        console.log(res)
      }
    })

    
  }
}
