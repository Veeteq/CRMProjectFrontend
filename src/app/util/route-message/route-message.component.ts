import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert/alert.service';
import { RouteMessageService } from './route-message.service';

@Component({
  selector: 'app-route-message',
  templateUrl: './route-message.component.html',
  styleUrls: ['./route-message.component.css']
})
export class RouteMessageComponent implements OnInit {
  currentMessage: string = null;

  constructor(private routeMessageService: RouteMessageService, 
              private alertService: AlertService) { }

  ngOnInit(): void {    
    this.currentMessage = this.routeMessageService.message;
    if (this.currentMessage) {
      this.alertService.error(this.currentMessage);
    }  
  }

}
