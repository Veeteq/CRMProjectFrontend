import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert } from './alert';
import { AlertType } from './alert-type';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject: Subject<Alert> = new Subject<Alert>();
  private keepAfterRouteChange: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false, options?: any) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(new Alert({ ...options, alertType: AlertType.SUCCESS, message, keepAfterRouteChange }));
  }

  error(message: string, keepAfterRouteChange = false, options?: any) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(new Alert({ ...options, alertType: AlertType.ERROR, message, keepAfterRouteChange }));
  }

  clear() {
    this.subject.next();
  }
}
