import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "src/app/common/services/app.service";
import { Observable, tap } from "rxjs";
import { IUser } from "@entities";
import { IReqResetPassword, IReqSignIn, IResAuthDatas } from "@interfaces";
import { EAuthKeys } from "src/app/auth/enums/auth-keys.enum";
import { v4 } from "uuid";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _http: HttpClient,
    private appService: AppService
  ) {}

  get url(): string {
    return this.appService.apiUserUrl + '/auth'
  }

  get token(): string | null {
    return localStorage.getItem(EAuthKeys.TOKEN);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(EAuthKeys.TOKEN_REFRESH);
  }

  get deviceId(): string {
    let deviceId: string | null = localStorage.getItem(EAuthKeys.DEVICE_ID);

    if (!deviceId) {
      deviceId = v4();
      localStorage.setItem(EAuthKeys.DEVICE_ID, deviceId);
    }

    return deviceId;
  }

  authorization() {
    return `Bearer ${this.token}`;
  }

  signIn(data: IReqSignIn): Observable<IResAuthDatas> {
    return this._http.post<IResAuthDatas>(`${this.url}/login`, data).pipe(tap(console.log));
  }

  refresh() {
    return this._http.get(`${this.url}/refresh`).pipe(tap(console.log));
  }

  reset(data: IReqResetPassword): Observable<IUser> {
    return this._http.put<IUser>(`${this.url}/reset-password`, data).pipe(tap(console.log));
  }
}
