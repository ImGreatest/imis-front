import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "../app.service";
import { Observable, tap } from "rxjs";
import { IUser } from "@entities";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {}

  get url(): string {
    return this.appService.apiUserUrl + '/user'
  }

  createUser() {

  }

  getUserAndCount() {

  }

  getUserByEmail() {

  }

  getUserById() {

  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/get-users`).pipe(tap(console.log));
  }

  updateUser() {

  }

  deleteUser() {

  }
}
