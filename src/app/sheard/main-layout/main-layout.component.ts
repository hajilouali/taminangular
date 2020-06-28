import { Component, OnInit, Inject } from '@angular/core';
import { TitleService } from 'src/app/core/_services/common/title.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { ApiServiceService, UserBioInterFace } from 'src/app/core/_services/api-service.service';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
const SEPARATOR = ' > ';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  title: string;
  userdio: UserBioInterFace = null;
  constructor(
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private api: ApiServiceService) {

   }
  logout() {
    this.api.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
      this.title = document.title;
      this.api.userinformation().subscribe(res =>
        {
          this.userdio = res;
        },
        error => this.router.navigate(['/login']));
  }

}
