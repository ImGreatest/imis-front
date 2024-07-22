import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/common/services/app.service';
import { Observable, tap } from 'rxjs';
import { IUser } from '@entities';
import {
  IPermissions,
  IReqResetPassword,
  IReqSignIn,
  IResAuthDatas,
} from '@interfaces';
import { EAuthKeys } from 'src/app/auth/enums/auth-keys.enum';
import { nanoid } from 'nanoid';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient, private appService: AppService) {}

  get url(): string {
    return this.appService.apiUserUrl + '/auth';
  }

  get token(): string | null {
    return localStorage.getItem(EAuthKeys.TOKEN);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(EAuthKeys.TOKEN_REFRESH);
  }

  get permissions(): IPermissions | null {
    const permissionsJson = localStorage.getItem(EAuthKeys.PERMISSIONS);
    return permissionsJson ? JSON.parse(permissionsJson) : null;
  }

  get deviceId(): string {
    let deviceId: string | null = localStorage.getItem(EAuthKeys.DEVICE_ID);

    if (!deviceId) {
      deviceId = nanoid();
      localStorage.setItem(EAuthKeys.DEVICE_ID, deviceId);
    }

    return deviceId;
  }

  get userId(): number | null {
    const id = localStorage.getItem(EAuthKeys.USER_ID);
    if (id) {
      return +id;
    }
    return null;
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
    localStorage.setItem(
      EAuthKeys.PERMISSIONS,
      JSON.stringify(data.permissions)
    );
    localStorage.setItem(EAuthKeys.USER_ID, String(data.id));
  }

  signIn(data: IReqSignIn): Observable<IResAuthDatas> {
    return this._http
      .post<IResAuthDatas>(`${this.url}/login`, {
        email: data.email,
        password: data.password,
        deviceId: this.deviceId,
      })
      .pipe(tap((data) => this.setToken(data)));
  }

  logout(): void {
    localStorage.removeItem(EAuthKeys.TOKEN);
    localStorage.removeItem(EAuthKeys.TOKEN_REFRESH);
  }

  refresh(): Observable<IResAuthDatas> {
    return this._http
      .post<IResAuthDatas>(`${this.url}/refresh`, {
        token: this.refreshToken,
        deviceId: this.deviceId,
      })
      .pipe(tap((data) => this.setToken(data)));
  }

  reset(data: IReqResetPassword): Observable<IUser> {
    return this._http
      .put<IUser>(`${this.url}/reset-password`, data)
      .pipe(tap(console.log));
  }
}
