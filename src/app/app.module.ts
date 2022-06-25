import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FeaturesComponent } from './features/features.component';
import { MenuListItemComponent } from './features/ui/menu-list-item/menu-list-item.component';
import { HeaderComponent } from './header/header.component';
import { ErrorInterceptor } from './util/error.interceptor';
import { JwtInterceptor } from './util/jwt.interceptor';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ListComponent } from './features/statement/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuListItemComponent,
    FeaturesComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatToolbarModule,
    MatTableModule
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,   multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
