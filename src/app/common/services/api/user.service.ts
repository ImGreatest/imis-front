import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "@entities";
import { AppService } from "@services";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    public http: HttpClient,
    private appService: AppService
  ) {}

  get url(): string {
    return this.appService.apiUserUrl + 'user';
  }

  createUser(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/create-user`, data);
  }

  getUserAndCount() {
    return this.http.get(`${this.url}/get-users-and-count`);
  }

  getUserByEmail(email: string) {
    return this.http.get(`${this.url}/get-user-by-email/:${email}`);
  }

  getUserById(id: number) {
    return this.http.get(`${this.url}/get-user-by-id/:${id}`);
  }

  getUserRoleId(id: number) {
    return this.http.get(`${this.url}/get-user-role-id/:${id}`);
  }

  getUsers() {
    return this.http.get(`${this.url}/get-users`);
  }

  updateUser(id: number, user: IUser) {
    return this.http.put(`${this.url}/update/:${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/remove/:${id}`);
  }
}
