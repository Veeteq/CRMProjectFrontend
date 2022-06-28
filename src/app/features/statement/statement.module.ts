import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListComponent } from '../statement/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ImportComponent } from './import/import.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DetailsComponent } from './details/details.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATE_FORMAT } from './model/custom-date-format';

const routes: Routes = [
  { path: '',       pathMatch: 'full', redirectTo: 'list' },
  { path: 'list',   component: ListComponent },
  { path: 'import', component: ImportComponent }
];

@NgModule({
  declarations: [
    ListComponent,
    ImportComponent,
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
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: DatePipe },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ] 
})
export class StatementModule { }
