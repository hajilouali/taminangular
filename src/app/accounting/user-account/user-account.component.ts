import { ApiServiceService, UserAccounting } from 'src/app/core/_services/api-service.service';
import { Component, OnInit } from '@angular/core';
declare var Stimulsoft: any;
import moment from 'moment-jalaali';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  options: any = new Stimulsoft.Viewer.StiViewerOptions();
  viewer: any = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
  object: UserAccounting[] = [];

  constructor(private api: ApiServiceService) {

  }

  ngOnInit(): void {
    let object123 = [];
    let index = 1 ;
    this.api.getUserAccounting().subscribe(res => {
      this.object = res.data;
      this.object.forEach(ele => {
        object123.push({
          ClientName: ele.userDto.fullName,
          ClientPhone: ele.userDto.phoneNumber,
          tbRow: index,
          tbDate:`${moment(ele.dateTime).format('jYYYY/jMM/jDD hh:mm')}`,
          tbDiscription: ele.discription,
          tbBedehkar: ele.bedehkari,
          tbBestankar: ele.bestankar,
          ReportDate: moment().format('jYYYY/jMM/jDD'),

        });
        index ++;
       });
      Stimulsoft.Base.StiLicense.key ='6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl2AD0gPVknKsaW0un+3PuM6TTcPMUAWEURKXNso0e5OFPaZYasFtsxNoDemsFOXbvf7SIcnyAkFX/4u37NTfx7g+0IqLXw6QIPolr1PvCSZz8Z5wjBNakeCVozGGOiuCOQDy60XNqfbgrOjxgQ5y/u54K4g7R/xuWmpdx5OMAbUbcy3WbhPCbJJYTI5Hg8C/gsbHSnC2EeOCuyA9ImrNyjsUHkLEh9y4WoRw7lRIc1x+dli8jSJxt9C+NYVUIqK7MEeCmmVyFEGN8mNnqZp4vTe98kxAr4dWSmhcQahHGuFBhKQLlVOdlJ/OT+WPX1zS2UmnkTrxun+FWpCC5bLDlwhlslxtyaN9pV3sRLO6KXM88ZkefRrH21DdR+4j79HA7VLTAsebI79t9nMgmXJ5hB1JKcJMUAgWpxT7C7JUGcWCPIG10NuCd9XQ7H4ykQ4Ve6J2LuNo9SbvP6jPwdfQJB6fJBnKg4mtNuLMlQ4pnXDc+wJmqgw25NfHpFmrZYACZOtLEJoPtMWxxwDzZEYYfT';
      Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile('localization/fa.xml', true);
      const report = new Stimulsoft.Report.StiReport();
      report.loadFile('reports/Moein.mrt');
      const dsDT = new Stimulsoft.System.Data.DataSet('DT');

      dsDT.readJson(object123);
      report.regData('DT', 'DT', dsDT);
      this.viewer.report = report;
      this.viewer.renderHtml('viewerContent');
    });

  }

}
