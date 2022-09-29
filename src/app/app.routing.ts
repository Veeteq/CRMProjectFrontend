import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { FeaturesComponent } from "./features/features.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: '',      pathMatch: 'full', redirectTo: 'home' },
  { path: 'home',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '',      component: FeaturesComponent, children: [
    { path: 'dashboard',    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),          canActivate: [AuthGuard] },
    { path: 'statement',    loadChildren: () => import('./features/statement/statement.module').then(m => m.StatementModule),          canActivate: [AuthGuard] },
    { path: 'document',     loadChildren: () => import('./features/document/document.module').then(m => m.DocumentModule),             canActivate: [AuthGuard] },
    { path: 'counterparty', loadChildren: () => import('./features/counterparty/counterparty.module').then(m => m.CounterpartyModule), canActivate: [AuthGuard] }
  ]},
  { path: '**',    redirectTo: '' }
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
