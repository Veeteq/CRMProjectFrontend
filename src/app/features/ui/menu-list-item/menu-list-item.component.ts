import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavItem } from '../../model/nav-item';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css'],
  animations: [
    trigger('indicatorRotate', [
        state('collapsed', style({ transform: 'rotate(0deg)' })),
        state('expanded', style({ transform: 'rotate(180deg)' })),
        transition('expanded <=> collapsed',
            animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
        ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean = false;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() navItem: NavItem;
  @Input() depth: number;

  constructor(public navService: NavService,
              public router: Router,
              private authenticationService: AuthenticationService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.navItem.route && url) {
        this.expanded = url.indexOf(`/${this.navItem.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(navItem: NavItem) {
    if (!navItem.children || !navItem.children.length) {
      if (navItem.route) {
        this.router.navigate([navItem.route]);
      } else {
        this.handleSpecial(navItem);
      }
    }

    if (navItem.children && navItem.children.length) {
      this.expanded = !this.expanded;
    }
  }

  private handleSpecial(navItem: NavItem) {
    if (navItem.displayName == 'Sign Out') {
      this.handleSignOut();
    }
  }

  handleSignOut() {
    this.authenticationService.logout();
  }  
}
