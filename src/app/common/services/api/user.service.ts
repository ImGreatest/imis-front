import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';
import { Observable, of } from 'rxjs';
import { ISuccessStudent } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(public http: HttpClient) {}
  getStudentList(): Observable<Array<ISuccessStudent>> {
    const students = [
        {
            id: 1,
            name: "имя",
            surname: "Фамилия",
            direction: "Испк",
            group: "492",
        }
    ]
    return of(students)
  }
}