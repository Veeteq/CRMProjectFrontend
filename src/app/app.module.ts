import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localePL from '@angular/common/locales/pl';
import { LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from './alert/alert.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FeaturesComponent } from './features/features.component';
import { MenuListItemComponent } from './features/ui/menu-list-item/menu-list-item.component';
import { HeaderComponent } from './header/header.component';
import { ErrorInterceptor } from './util/error.interceptor';
import { JwtInterceptor } from './util/jwt.interceptor';

registerLocaleData(localePL);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuListItemComponent,
    FeaturesComponent
  ],
  imports: [
    AlertModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,   multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
