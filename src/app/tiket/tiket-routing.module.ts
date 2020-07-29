import { ListtiketComponent } from './listtiket/listtiket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiketcontentComponent } from './tiketcontent/tiketcontent.component';
import { GuardService } from '../core/_services/common/guard.service';
import { MainLayoutComponent } from '../sheard/main-layout/main-layout.component';


const routes: Routes = [
  {path: 'TiketList' , canActivate: [GuardService], data: { title: ['مدیریت تیکت ها'] }, component: MainLayoutComponent, children: [
    {path: '', component: ListtiketComponent}
  ]},
  {path: 'Tiket' , canActivate: [GuardService], data: { title: ['تیکت'] }, component: MainLayoutComponent, children: [
    {path: '', component: TiketcontentComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiketRoutingModule { }
