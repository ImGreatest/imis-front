import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';
import { Observable, of } from 'rxjs';
import { ISuccessStudent } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(public http: HttpClient) {}
  getStudentList(): Observable<Array<ISuccessStudent>> {
    return this.http.get<Array<ISuccessStudent>>(`${environment.apiUserUrl}/user/students`);
  }
}