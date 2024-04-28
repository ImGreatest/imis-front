import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "src/app/common/services/app.service";
import { Observable, tap } from "rxjs";
import { IUser } from "@entities";
import { IReqResetPassword, IReqSignIn, IResAuthDatas } from "@interfaces";
import { EAuthKeys } from "src/app/auth/enums/auth-keys.enum";
import { nanoid } from 'nanoid';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _http: HttpClient,
    private appService: AppService
  ) {}

  get url(): string {
    return this.appService.apiCabinetUrl + '/auth'
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
      deviceId = nanoid();
      localStorage.setItem(EAuthKeys.DEVICE_ID, deviceId);
    }

    return deviceId;
  }

  get authorization(): string {
      return `Bearer ${this.token}`;
  }


  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(data: IResAuthDatas): void {
    localStorage.setItem(EAuthKeys.TOKEN, data.access);
    localStorage.setItem(EAuthKeys.TOKEN_REFRESH, data.refresh);
  }


  signIn(data: IReqSignIn): Observable<IResAuthDatas> {
    return this._http.post<IResAuthDatas>(`${this.url}/login`, data).pipe(tap(console.log));
  }

  logout(): void {
    localStorage.removeItem(EAuthKeys.TOKEN);
    localStorage.removeItem(EAuthKeys.TOKEN_REFRESH);
  }

  refresh(): Observable<IResAuthDatas> {
    return this._http.post<IResAuthDatas>(`${this.url}/refresh`, {
      token: this.refreshToken,
      deviceId: this.deviceId
    }).pipe(tap((data) => this.setToken(data)));
  }

  reset(data: IReqResetPassword): Observable<IUser> {
    return this._http.put<IUser>(`${this.url}/reset-password`, data).pipe(tap(console.log));
  }
}
