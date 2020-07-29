import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TiketRoutingModule } from './tiket-routing.module';
import { ListtiketComponent } from './listtiket/listtiket.component';
import { TiketcontentComponent } from './tiketcontent/tiketcontent.component';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

@NgModule({
  declarations: [ListtiketComponent, TiketcontentComponent],
  imports: [
    CommonModule,
    CoreModule,
    TiketRoutingModule,
    AngularEditorModule,
    ToastModule,
    MessagesModule,
    MessageModule
  ]
})
export class TiketModule { }
