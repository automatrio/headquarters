import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../_services/toast.service';
import { catchError } from 'rxjs/operators';
import { ToastData } from '../_components/toast/toast-config';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toast: ToastService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // If no error occurs, the output Observable produced by catchError works exactly the same way as the input Observable.
      catchError(error =>
        {
          if(error && error instanceof HttpErrorResponse)
          {
            switch(error.status)
            {
              case 400:
                if(error.error.errors)
                {
                  const modalStateErrors = [];
                  for(const key in error.error.errors)
                  {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                  throw modalStateErrors.flat();
                }
                else
                  this.toast.displayToast(this.displayToastMessage(error));
                  break;
                  
              case 401:
                this.toast.displayToast(this.displayToastMessage(error));
                break;
                
              case 404:
                this.toast.displayToast(this.displayToastMessage(error));
                break;
                
              case 500:
                this.toast.displayToast(this.displayToastMessage(error));
                break;

              default:
                break;
            }
          }
          return throwError(error);
        })
    );
  }

  displayToastMessage(error: HttpErrorResponse, message: string = error.statusText)
  {
    return {type: 'warning', text: message} as ToastData;
  }

}
