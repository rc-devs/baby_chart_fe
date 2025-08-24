import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  chart: Chart | null = null

  constructor(private http: HttpClient) { }

  //show chart/entries


  showChartByChildId(childId: number) {
  console.log("Fetching chart for child ID:", childId);
  return this.http.get<Chart>(`${environment.apiUrl}/children/${childId}/chart`);
 }
}
