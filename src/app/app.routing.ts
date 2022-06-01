import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: '',   component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {

}