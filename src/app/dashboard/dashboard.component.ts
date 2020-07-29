import { error } from 'protractor';
import { ApiServiceService, UserBioInterFace, UserBio, UserBio1 } from './../core/_services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userdio: UserBio1 ={userWallet : 0};
  constructor(private spinner: NgxSpinnerService, private api: ApiServiceService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.api.userinformation().subscribe(res =>
      {
        this.userdio = res.data;
        this.spinner.hide();

      });
  }

}
