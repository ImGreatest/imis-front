import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
import { catchError, Observable } from "rxjs";
import { environment } from "src/enviroments/enviroments";

@Injectable()
export class AuthInterceptor extends HttpInterceptor {
  constructor(private route: Router, private authService: AuthService) {
    super();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.apiRatingUrl || environment.apiCabinetUrl || environment.apiEmployerUrl)) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.authService.authorization).append('x-locale', 'it')
    });

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && authReq.)
      })
    )
  }
}
