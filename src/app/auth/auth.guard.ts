import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable({  providedIn: 'root'})
export class AuthGuard implements CanActivateChild {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  canActivateChild(): boolean {
    if (!this._authService.isAuthenticated()) {
      this._router.navigate(['auth']).then((r) => {});
    }

    return this._authService.isAuthenticated();
  }
}
