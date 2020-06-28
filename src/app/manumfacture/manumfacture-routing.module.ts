import { ManufactureListComponent } from './manufacture-list/manufacture-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../core/_services/common/guard.service';
import { MainLayoutComponent } from '../sheard/main-layout/main-layout.component';


const routes: Routes = [
  {path: 'ManufactureList' , canActivate: [GuardService], data: { title: ['مدیریت کارگاه ها'] }, component: MainLayoutComponent, children: [
    {path: '', component: ManufactureListComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManumfactureRoutingModule { }
