import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { UserAccountComponent } from './user-account/user-account.component';
import { WalletComponent } from './wallet/wallet.component';


@NgModule({
  declarations: [UserAccountComponent, WalletComponent],
  imports: [
    CommonModule,
    CoreModule,
    AccountingRoutingModule
  ]
})
export class AccountingModule { }
