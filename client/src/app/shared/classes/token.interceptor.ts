import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { codeStatuses } from '../../../../../data/code-statuses.js'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let updateHeaders = null;

    if (this.authService.iaAuthenticated()) {
      updateHeaders = {
        setHeaders: {
          Authorization: this.authService.getToken()
        }
      };
    }

    const clonedRequest: HttpRequest<any> = request.clone(updateHeaders);

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => this.handleAuthError(error))
    );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === codeStatuses.UNAUTHORIZED_CODE) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionExpired: true
        }
      }).then(() => {});
    }

    return throwError(error);
  }
}
