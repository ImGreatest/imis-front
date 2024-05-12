import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "src/app/common/services/app.service";
import { Observable, tap } from "rxjs";
import { IUser } from "@entities";
import { IAction, IPermissions, IReqResetPassword, IReqSignIn, IResAuthDatas, ISubjectPermisions } from "@interfaces";
import { EAuthKeys } from "src/app/auth/enums/auth-keys.enum";
import { nanoid } from 'nanoid';

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

  get permissions(): IPermissions|null {
    const permissionsJson = localStorage.getItem(EAuthKeys.PERMISSIONS);
    return permissionsJson ? JSON.parse(permissionsJson) : null;
  }

  get email(): string | null {
    return localStorage.getItem(EAuthKeys.EMAIL);
  }

  getPermissionsForSubject(subject: string): ISubjectPermisions {
    const perms = this.permissions || {};
    const getPermissionForAction = (perms: IAction[], action: string) => {
        const perm = perms.find(perm => perm.action === action);
        return {
            exists: perm !== undefined,
            hasCondition: perm?.condition !== null
        };
    };

    const subjectPermission: ISubjectPermisions = {
        delete: false,
        create: false,
        read: false,
        update: false,
        deleteCondition: false,
        createCondition: false,
        readCondition: false,
        updateCondition: false,
    };

    if (perms['all']) {
        const { exists: deleteExists, hasCondition: deleteHasCondition } = getPermissionForAction(perms['all'], 'delete');
        const { exists: createExists, hasCondition: createHasCondition } = getPermissionForAction(perms['all'], 'create');
        const { exists: updateExists, hasCondition: updateHasCondition } = getPermissionForAction(perms['all'], 'update');
        const { exists: readExists, hasCondition: readHasCondition } = getPermissionForAction(perms['all'], 'read');

        subjectPermission.delete = deleteExists;
        subjectPermission.create = createExists;
        subjectPermission.update = updateExists;
        subjectPermission.read = readExists;
        subjectPermission.deleteCondition = deleteHasCondition;
        subjectPermission.createCondition = createHasCondition;
        subjectPermission.updateCondition = updateHasCondition;
        subjectPermission.readCondition = readHasCondition;
    }

    if (perms[subject]) {
        const { exists: deleteExists, hasCondition: deleteHasCondition } = getPermissionForAction(perms[subject], 'delete');
        const { exists: createExists, hasCondition: createHasCondition } = getPermissionForAction(perms[subject], 'create');
        const { exists: updateExists, hasCondition: updateHasCondition } = getPermissionForAction(perms[subject], 'update');
        const { exists: readExists, hasCondition: readHasCondition } = getPermissionForAction(perms[subject], 'read');

        subjectPermission.delete = deleteExists || subjectPermission.delete;
        subjectPermission.create = createExists || subjectPermission.create;
        subjectPermission.update = updateExists || subjectPermission.update;
        subjectPermission.read = readExists || subjectPermission.read;
        subjectPermission.deleteCondition = deleteHasCondition || subjectPermission.deleteCondition;
        subjectPermission.createCondition = createHasCondition || subjectPermission.createCondition;
        subjectPermission.updateCondition = updateHasCondition || subjectPermission.updateCondition;
        subjectPermission.readCondition = readHasCondition || subjectPermission.readCondition;
    }

    return subjectPermission;
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
    localStorage.setItem(EAuthKeys.PERMISSIONS,JSON.stringify(data.permissions));
    localStorage.setItem(EAuthKeys.EMAIL, data.email);
  }

  signIn(dataSign: IReqSignIn): Observable<IResAuthDatas> {
    return this._http.post<IResAuthDatas>(`${this.url}/login`, {
      email: dataSign.email,
      password: dataSign.password,
      deviceId: this.deviceId,
    }).pipe(tap((data) => this.setToken({
      access: data.access,
      refresh: data.refresh,
      permissions: data.permissions,
      email: dataSign.email
    })));
  }

  logout(): void {
    localStorage.removeItem(EAuthKeys.TOKEN);
    localStorage.removeItem(EAuthKeys.TOKEN_REFRESH);
    localStorage.removeItem(EAuthKeys.PERMISSIONS);
    localStorage.removeItem(EAuthKeys.EMAIL);
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
