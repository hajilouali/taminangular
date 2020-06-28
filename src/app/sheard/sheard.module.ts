import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheardRoutingModule } from './sheard-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { core } from '@angular/compiler';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION,
   NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
const NgxUiLoaderConfig: NgxUiLoaderConfig = {
  pbColor: 'red',
  bgsColor: 'red',
  bgsPosition: POSITION.bottomRight,
  bgsSize: 70,
  fgsSize: 70,
  fgsPosition: POSITION.bottomRight,
  fgsColor: 'red',
  bgsType: SPINNER.doubleBounce,
  fgsType: SPINNER.doubleBounce,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 3
}

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    SheardRoutingModule,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({showForeground: true})
  ]
})
export class SheardModule { }
