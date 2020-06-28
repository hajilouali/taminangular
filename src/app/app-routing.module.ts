import { GuardService } from './core/_services/common/guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFondComponent } from './not-fond/not-fond.component';
import { MainLayoutComponent } from './sheard/main-layout/main-layout.component';


const routes: Routes = [
  {path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  {path: 'Dashboard', component: MainLayoutComponent, data: { title: ['داشبورد کاربری'] }, canActivate: [GuardService] , children: [
    {path: '', component: DashboardComponent}
  ]},
  {path: '**', component: NotFondComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
