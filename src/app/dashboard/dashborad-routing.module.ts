import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DASHBOARDROUTES } from './dashboard.routes';
// import { AuthGuard } from '../auth/auth.guard';

const routes: Routes =[
  {
    path: '',
    component: DashboardComponent,
    children: DASHBOARDROUTES,
    // canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboradRoutingModule { }
