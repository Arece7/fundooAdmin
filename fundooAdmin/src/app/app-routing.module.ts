import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
   { path: 'dash', component: DashboardComponent } ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
  })
export class AppRoutingModule { }
