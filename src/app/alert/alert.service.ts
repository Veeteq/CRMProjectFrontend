import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from './alert';
import { AlertType } from './alert-type';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject: BehaviorSubject<Alert> = new BehaviorSubject<Alert>(null);

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  success(message: string, options?: any) {
    this.subject.next(new Alert({ ...options, alertType: AlertType.SUCCESS, message }));
  }

  info(message: string, options?: any) {
    this.subject.next(new Alert({ ...options, alertType: AlertType.INFO, message }));
  }

  error(message: string, options?: any) {
    this.subject.next(new Alert({ ...options, alertType: AlertType.ERROR, message }));
  }

  clear() {
    this.subject.next(null);
  }
}
