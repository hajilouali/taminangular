import { PrintDiskComponent } from './print-disk/print-disk.component';
import { AddDiskComponent } from './add-disk/add-disk.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../sheard/main-layout/main-layout.component';
import { GuardService } from '../core/_services/common/guard.service';
import { DisklistComponent } from './disklist/disklist.component';


const routes: Routes = [
  {path: 'AddDisk', component: MainLayoutComponent, data: { title: ['ساخت دیسک'] }, canActivate: [GuardService] , children: [
    {path: '', component: AddDiskComponent}
  ]},
  {path: 'ListDisk', component: MainLayoutComponent, data: { title: [' دیسک'] }, canActivate: [GuardService] , children: [
    {path: '', component: DisklistComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiskRoutingModule { }
