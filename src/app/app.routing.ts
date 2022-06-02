import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: '',      pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login',   component: LoginComponent },
  { path: '**',      pathMatch: 'full', redirectTo: '' }
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
