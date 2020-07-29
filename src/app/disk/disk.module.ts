import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiskRoutingModule } from './disk-routing.module';
import { AddDiskComponent } from './add-disk/add-disk.component';
import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {FieldsetModule} from 'primeng/fieldset';
import { DisklistComponent } from './disklist/disklist.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EnvServiceProvider } from '../core/_services/env/env.service.provider';
import { PrintDiskComponent } from './print-disk/print-disk.component';
// import {InputNumberModule} from './../core/_services/inputnumber/public_api';

@NgModule({
  declarations: [AddDiskComponent, DisklistComponent, PrintDiskComponent],
  imports: [
    CommonModule,
    CoreModule,

    DiskRoutingModule,
    DragDropModule,
    PanelModule,
    TableModule,
    TabViewModule,
    CodeHighlighterModule,
    FieldsetModule,
    NgxMaskModule.forRoot(),

  ],
  providers:[
    EnvServiceProvider
  ]
})
export class DiskModule { }
