import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManumfactureRoutingModule } from './manumfacture-routing.module';
import { ManufactureListComponent } from './manufacture-list/manufacture-list.component';


@NgModule({
  declarations: [ManufactureListComponent],
  imports: [
    CommonModule,
    CoreModule,
    ManumfactureRoutingModule
  ]
})
export class ManumfactureModule { }
