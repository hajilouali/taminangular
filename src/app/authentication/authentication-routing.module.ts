import { Title } from '@angular/platform-browser';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainLayoutComponent } from './../sheard/main-layout/main-layout.component';
import { GuardService } from './../core/_services/common/guard.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mainModule } from 'process';


const routes: Routes = [
  {path: 'login', component: LoginComponent, data: { title: ['ورود به حساب کاربری'] }},
  {path: 'Profile', data: { title: ['پروفایل کاربری'] }, canActivate: [GuardService], component: MainLayoutComponent, children: [
    {path: '', component: UserProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
