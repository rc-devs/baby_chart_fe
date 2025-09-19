import { Injectable} from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CaregiverService {
  caregivers: User[] =([]) //should this be a signal or subject or is this fine?
  constructor(private http: HttpClient) { }

  //http request here set caregivers on response

  addAccessToCaregiver(userId: number, childId: number) {
    return this.http.post(
      `${environment.apiUrl}/children/${childId}/child_accesses`,
      { user_id: userId }
    );
  }
}
