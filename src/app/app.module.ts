import { ApiServiceService } from './core/_services/api-service.service';
import { AuthInterceptorService } from './core/_services/common/auth-interceptor.service';
import { AppComponent } from './app.component';
import { Routes , RouterModule} from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment.prod';
import { APP_CONFIG, AppConfig } from './app.config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CoreModule } from './core/core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFondComponent } from './not-fond/not-fond.component';
import { TitleService } from './core/_services/common/title.service';
import { SeoService } from './core/_services/common/seo.service';
import { NgxSpinnerModule } from 'ngx-spinner';

import { GuardService } from './core/_services/common/guard.service';
import { EmployeeModule } from './employee/employee.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { ManumfactureModule } from './manumfacture/manumfacture.module';
import { DiskModule } from './disk/disk.module';
import { AccountingModule } from './accounting/accounting.module';
import { TiketModule } from './tiket/tiket.module';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
const maskConfig: Partial<IConfig> = {
  validation: true,
};
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFondComponent,

  ],
  imports: [
    DiskModule,
    AccountingModule,
    TiketModule,
    ManumfactureModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    BrowserModule,
    CoreModule,
    EmployeeModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxMaskModule.forRoot(maskConfig),
    NgWizardModule.forRoot(ngWizardConfig),

  ],
  providers: [
    AuthInterceptorService, ApiServiceService,
    GuardService,
    TitleService,
    SeoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: APP_CONFIG,
      useValue: AppConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
