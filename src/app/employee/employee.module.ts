import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ListEmployesComponent } from './list-employes/list-employes.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
const maskConfig: Partial<IConfig> = {

};

@NgModule({
  declarations: [EmployeeListComponent, ListEmployesComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    CoreModule,
    NgxMaskModule.forRoot(),
    NgWizardModule.forRoot(ngWizardConfig)

  ]
})
export class EmployeeModule { }
