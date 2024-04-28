import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, finalize, Observable, take, throwError } from "rxjs";
import { environment } from "src/enviroments/enviroments";
import { filter, switchMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress: boolean = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<object>> {
    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap(() => next.handle(this.addAuthenticationToken(req)))
      );
    } else {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((res) => {
          this.refreshTokenSubject.next(res.refresh);
          return next.handle(this.addAuthenticationToken(req));
        }),
        catchError((err) => {
          this.authService.logout();
          this.router.navigate(['auth', 'login']);
          return throwError(() => err);
        }),
        finalize(() => (this.refreshTokenInProgress = false))
      );
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.apiRatingUrl || environment.apiUserUrl || environment.apiEmployerUrl)) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.authService.authorization).append('x-locale', 'it')
    });

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          authReq.url.includes(environment.apiRatingUrl || environment.apiUserUrl || environment.apiEmployerUrl) &&
          !authReq.url.includes('auth') &&
          err.status === 401
        ) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => err);
        }
      })
    )
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
        headers: request.headers.set('Authorization', this.authService.authorization),
    });
  }
}
