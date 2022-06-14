import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser: User;
  title = "CRM Application";
  username: string = 'witek';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    const currentUser = this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  onLogout() {    
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
