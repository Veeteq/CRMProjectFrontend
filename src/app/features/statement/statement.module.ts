import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../statement/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '',       pathMatch: 'full', redirectTo: 'list' },
  { path: 'list',   component: ListComponent },
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
