import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [LoginComponent, UserProfileComponent],
  imports: [
    AuthenticationRoutingModule,
    CoreModule,
    CommonModule,

  ]
})
export class AuthenticationModule { }
