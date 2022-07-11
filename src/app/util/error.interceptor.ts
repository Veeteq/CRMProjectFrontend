import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import { RouteMessageService } from "./route-message/route-message.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private routeMessageService: RouteMessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let handled: boolean = false;

    return next.handle(request)
    .pipe(
      catchError((errorResponse) => {
        let errMsg = null;
        if (errorResponse.error instanceof ErrorEvent) {
          errMsg = `Error: ${errorResponse.error.message}`;
        } else if (errorResponse instanceof HttpErrorResponse) {
          errMsg = `Error Status ${errorResponse.status}: ${errorResponse.message}`;// - ${errorResponse.error.message}`;
          handled = this.handleServerSideError(errorResponse);
        } 
        console.error(errMsg ? errMsg : errorResponse);

        if (!handled) {
          if (errMsg) {
            return throwError(errMsg);
          } else {
            return throwError("Unexpected error occured!");
          }
        } else {
          return of(errorResponse);
        }
      }))
  }

  handleServerSideError(error: HttpErrorResponse): boolean {
    let handled: boolean = false;

    switch (error.status) {
      case 401:
        this.routeMessageService.message = "Please login again.";
        this.authenticationService.logout();
        handled = true;
        break;
      case 403:
        this.routeMessageService.message = "Please login again.";
        this.authenticationService.logout();
        handled = true;
        break;
    }

    return handled;
  }
}