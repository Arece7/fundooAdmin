import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './component/guard/auth.guard';
import { QuestionApprovalComponent } from './component/question-approval/question-approval.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
   { path: 'dash', component: DashboardComponent,canActivate: [AuthGuard] },
   { path: 'question',component: QuestionApprovalComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
  })
export class AppRoutingModule { }
