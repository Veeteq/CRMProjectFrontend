import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { NavItem } from './model/nav-item';
import { navMenu } from './model/nav-menu';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private _opened: boolean = true;
  private mediaWatcher: Subscription;
  private _navMenu: NavItem[] = navMenu;
  
  constructor(private mediaObserver: MediaObserver) {
    this.mediaWatcher = this.mediaObserver.media$.subscribe((mediaChange: MediaChange) => {
      this.handleMediaChange(mediaChange);
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  get opened(): boolean {
    return this._opened;
  }

  get navMenu(): NavItem[] {
    return this._navMenu;
  }

  private handleMediaChange(mediaChange: MediaChange) {
    if (this.mediaObserver.isActive('lt-md')) {
      this._opened = false;
  } else {
      this._opened = true;
  }

  }
}
