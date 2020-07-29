import { ApiServiceService } from './../../core/_services/api-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { IAppConfig, APP_CONFIG } from 'src/app/app.config';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: {
    username: string,
    password: string
  } = {
    username: null,
    password: null
  };
  formlogin: {
    username: string,
    password: string
  };
  constructor(private spinner: NgxSpinnerService, private auth: ApiServiceService ,@Inject(APP_CONFIG) public appConfig: IAppConfig) { }

  ngOnInit(): void {
    this.spinner.hide();
    localStorage.removeItem('token');
  }

  onSubmit() {
    this.spinner.show();
    this.auth.login(this.data);
    this.spinner.hide();
  }
}
