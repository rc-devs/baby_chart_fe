import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  //show chart/entries

  showChart(chart_id: number){
    return this.http.get<Chart>(`${environment.apiUrl}/charts/${chart_id}`)
  }
}
