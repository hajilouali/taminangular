import { SheardModule } from './../sheard/sheard.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { NumberToPersianPipe } from './Pipe/number-to-persian-pipe.service';
import { JalaliPipe } from './Pipe/jalali-pipe.service';
import { NumberFormatPipe } from './Pipe/number-format-pipe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from './_services/api-service.service';
import { PersianPipeModule } from '../sheard/Modules/common/persianPipe.module';
import { NgBytesPipeModule } from 'angular-pipes';
import { NgAbsPipeModule } from 'angular-pipes';
import { CarService } from './_services/carservice';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NationalCodeService} from 'ngx-persian';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { EnvServiceProvider } from './_services/env/env.service.provider';


@NgModule({
  declarations: [
    NumberToPersianPipe,
    JalaliPipe,
    NumberFormatPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SheardModule,
    AccordionModule,
    PersianPipeModule,
    NgBytesPipeModule,
    NgAbsPipeModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    TabViewModule,
    DropdownModule,
    PaginatorModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    KeyFilterModule,
    DpDatePickerModule,
    RadioButtonModule,
    InputMaskModule,
    ProgressSpinnerModule,
    NgxSpinnerModule,
    DragDropModule,
    PanelModule,
    CardModule,
    ScrollPanelModule,
  ],
  providers: [ApiServiceService, CarService, NationalCodeService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SheardModule,
    AccordionModule,
    PersianPipeModule,
    NgBytesPipeModule,
    NgAbsPipeModule,
    NumberToPersianPipe,
    JalaliPipe,
    NumberFormatPipe,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    TabViewModule,
    DropdownModule,
    PaginatorModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    KeyFilterModule,
    DpDatePickerModule,
    RadioButtonModule,
    InputMaskModule,
    ProgressSpinnerModule,
    NgxSpinnerModule,
    DragDropModule,
    PanelModule,
    CardModule,
    ScrollPanelModule,
  ]
})
export class CoreModule { }
