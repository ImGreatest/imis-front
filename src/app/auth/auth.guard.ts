import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  canActivateChild(): boolean {
    if (!this._authService.isAuthenticated) {
      console.log('inter', this._authService.isAuthenticated());
      this._router.navigate(['auth']);
    }

    return this._authService.isAuthenticated();
  }
}
