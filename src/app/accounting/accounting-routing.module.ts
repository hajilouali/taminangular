import { WalletComponent } from './wallet/wallet.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../core/_services/common/guard.service';
import { MainLayoutComponent } from '../sheard/main-layout/main-layout.component';


const routes: Routes = [
  {path: 'UserAccountting', data: { title: ['مرور حساب'] }, canActivate: [GuardService], component: MainLayoutComponent, children: [
    {path: '', component: UserAccountComponent}
  ]},
  {path: 'Wallet', data: { title: ['شارژ کیف پول'] }, canActivate: [GuardService], component: MainLayoutComponent, children: [
    {path: '', component: WalletComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
