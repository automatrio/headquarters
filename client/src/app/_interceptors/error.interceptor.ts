import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../_services/toast.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toast: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error)
        {
          switch (error.status) {
            case 400:
              if(error.error.errors)
              {
                const modalStateErrors = [];
                for(const key in error.error.errors)
                {
                  modalStateErrors.push(error.error.errors[key]);
                }
                throw modalStateErrors;
              }
              else
              {
                this.toast.displayError(error.error);
              }
              break;

            case 401:
              this.toast.displayError(error.error);
              break;
            case 404:
              this.toast.displayError(error.error);
              break;
            case 500:
              this.toast.displayError(error.error);
              break;

            default:
              break;
          }
        }
        return throwError(error); // only if we can't catch the error at all
      })
    );
  }
}
