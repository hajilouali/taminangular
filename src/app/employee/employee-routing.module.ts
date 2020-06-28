import { ListEmployesComponent } from './list-employes/list-employes.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MainLayoutComponent } from './../sheard/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../core/_services/common/guard.service';


const routes: Routes = [
  {path: 'EmployeeList' , canActivate: [GuardService], data: { title: ['مدیریت کارمندان'] }, component: MainLayoutComponent, children: [
    {path: '', component: EmployeeListComponent}
  ]},
  {path: 'ListEmployee' , canActivate: [GuardService], data: { title: ['مدیریت دسته بندی کارمندان'] }, component: MainLayoutComponent, children: [
    {path: '', component: ListEmployesComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
