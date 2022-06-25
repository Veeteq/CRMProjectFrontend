import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ImportComponent } from './import/import.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../statement/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '',       pathMatch: 'full', redirectTo: 'list' },
  { path: 'list',   component: ListComponent },
  { path: 'import', component: ImportComponent }
];

@NgModule({
  declarations: [ 
    ImportComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }
  { path: 'import', component: ListComponent }
];

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StatementModule { }
