import { ApiServiceService } from './../../core/_services/api-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { IAppConfig, APP_CONFIG } from 'src/app/app.config';

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
  constructor(private auth: ApiServiceService ,@Inject(APP_CONFIG) public appConfig: IAppConfig) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  onSubmit() {
    console.log(this.data);
    this.auth.login(this.data);
  }
}
