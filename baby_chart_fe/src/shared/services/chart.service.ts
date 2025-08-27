import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  chart: Chart | null = null

  //show chart/entries
  showChartByChildId(childId: number) {
  console.log("Fetching chart for child ID:", childId);
  return this.http.get<Chart>(`${environment.apiUrl}/children/${childId}/chart`);
 }

 indexEntriesByChildId(childId: number){
  return this.http.get<Entry[]>(`${environment.apiUrl}/children/${childId}/chart/entries`) 
 }

 createEntry(childId:number, entry: Entry,){
  return this.http.post<Entry>(`${environment.apiUrl}/children/${childId}/chart/entries`, entry) 
 }
}
