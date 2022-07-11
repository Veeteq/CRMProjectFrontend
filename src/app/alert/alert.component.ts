import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from './alert';
import { AlertType } from './alert-type';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  alert: Alert;
  
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert().subscribe(
      alert => {
        if (!alert) {
          this.alert = null;
          return;
        }

        this.alert = alert;
        if (alert.autoClose) {
          setTimeout(() => this.clear(), 3000);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clear() {
    this.alertService.clear();
  }

  cssClass(alert: Alert) {
    if (!alert) return null;

    const classes = ['alert', 'alert-dismissible'];
                
    const alertTypeClass = {
      [AlertType.SUCCESS]: 'alert alert-success',
      [AlertType.ERROR]: 'alert alert-danger',
      [AlertType.INFO]: 'alert alert-info',
      [AlertType.WARNING]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.alertType]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');    
  }
}
