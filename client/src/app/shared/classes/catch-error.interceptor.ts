import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MaterializeService } from './materialize.service';
import {codeStatuses} from '../../../../../data/code-statuses';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest: HttpRequest<any> = request.clone();

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status !== codeStatuses.UNAUTHORIZED_CODE) {
          const message = error.error && error.error.message || error.message;

          if (message) {
            MaterializeService.toast(message);
          }
        }

        return throwError(error);
      })
    );
  }
}
