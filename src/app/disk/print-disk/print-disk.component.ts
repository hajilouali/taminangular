import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
declare var Stimulsoft: any;

@Component({
  selector: 'app-print-disk',
  templateUrl: './print-disk.component.html',
  styleUrls: ['./print-disk.component.css']
})
export class PrintDiskComponent implements OnInit {
  options: any = new Stimulsoft.Viewer.StiViewerOptions();
  viewer: any = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
  object: objectpasstoprint[] = [];
  constructor(
    private route: ActivatedRoute,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
    ) {

    // const myArray = this.route.snapshot.queryParamMap.get('myArray');
    this.object = this.config.data.myArray as objectpasstoprint[];

    // If the value is null, create a new array and store it
    // Else parse the JSON string we sent into an array
    // if (myArray === null) {
    //   this.object = new Array<objectpasstoprint>();
    // } else {
    //   this.object = JSON.parse(myArray);
    // }
  }

  ngOnInit(): void {
    let object123 = [];
    let index = 1 ;

    this.object.forEach(ele => {
        object123.push({
          ManufacName: ele.ManufacName,
          YY: ele.YY,
          ID: ele.ID,
          MM: ele.MM,
          ListNum: ele.ListNum,
          Payeman: ele.Payeman,
          ManufactureCode: ele.ManufactureCode,
          Karfarma: ele.Karfarma,
          Address: ele.Address,
          rRow: ele.rRow,
          rBimeh: ele.rBimeh,
          rNameFamily: ele.rNameFamily,
          rJob: ele.rJob,
          rCodeMeli: ele.rCodeMeli,
          rShenas: ele.rShenas,
          rFather: ele.rFather,
          rStartDate: ele.rStartDate,
          rEnddate: ele.rEnddate,
          rRooz: ele.rRooz,
          rMah: ele.rMah,
          rMaz: ele.rMaz,
          rMash: ele.rMash,
          rGeyreMash: ele.rGeyreMash,
          rBimehprice: ele.rBimehprice,
          BimehKarfarma: ele.BimehKarfarma,
          Bic: ele.Bic,
          TotalBim: ele.TotalBim,
          Date: ele.Date,
          rRozaneh: ele.rRozaneh
        });
        index ++;
       });
    Stimulsoft.Base.StiLicense.key ='6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl2AD0gPVknKsaW0un+3PuM6TTcPMUAWEURKXNso0e5OFPaZYasFtsxNoDemsFOXbvf7SIcnyAkFX/4u37NTfx7g+0IqLXw6QIPolr1PvCSZz8Z5wjBNakeCVozGGOiuCOQDy60XNqfbgrOjxgQ5y/u54K4g7R/xuWmpdx5OMAbUbcy3WbhPCbJJYTI5Hg8C/gsbHSnC2EeOCuyA9ImrNyjsUHkLEh9y4WoRw7lRIc1x+dli8jSJxt9C+NYVUIqK7MEeCmmVyFEGN8mNnqZp4vTe98kxAr4dWSmhcQahHGuFBhKQLlVOdlJ/OT+WPX1zS2UmnkTrxun+FWpCC5bLDlwhlslxtyaN9pV3sRLO6KXM88ZkefRrH21DdR+4j79HA7VLTAsebI79t9nMgmXJ5hB1JKcJMUAgWpxT7C7JUGcWCPIG10NuCd9XQ7H4ykQ4Ve6J2LuNo9SbvP6jPwdfQJB6fJBnKg4mtNuLMlQ4pnXDc+wJmqgw25NfHpFmrZYACZOtLEJoPtMWxxwDzZEYYfT';
    Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile('localization/fa.xml', true);
    const report = new Stimulsoft.Report.StiReport();
    report.loadFile('reports/Report.mrt');
    const dsDT = new Stimulsoft.System.Data.DataSet('DT');

    dsDT.readJson(object123);
    report.regData('DT', 'DT', dsDT);
    this.viewer.report = report;
    this.viewer.renderHtml('viewerContent');
  }

}
export interface objectpasstoprint {
    ManufacName?: string;
    YY?: string;
    ID?: number;
    MM?: string;
    ListNum?: string;
    Payeman?: string;
    ManufactureCode?: string;
    Karfarma?: string;
    Address?: string;
    rRow?: number;
    rBimeh?: string;
    rNameFamily?: string;
    rJob?: string;
    rCodeMeli?: string;
    rShenas?: string;
    rFather?: string;
    rStartDate?: string;
    rEnddate?: string;
    rRooz?: number;
    rMah?: number;
    rMaz?: number;
    rMash?: number;
    rGeyreMash?: number;
    rBimehprice?: number;
    BimehKarfarma?: number;
    Bic?: number;
    TotalBim?: number;
    Date?: string;
    rRozaneh?: number;
}
