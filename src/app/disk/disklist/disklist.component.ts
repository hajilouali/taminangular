import { Component, OnInit, ɵConsole } from '@angular/core';
import { KarMonthDto, ApiServiceService, Manufacturee } from 'src/app/core/_services/api-service.service';
import { SelectItem } from 'primeng/api';
import moment from 'moment-jalaali';
import { Console } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disklist',
  templateUrl: './disklist.component.html',
  styleUrls: ['./disklist.component.css']
})
export class DisklistComponent implements OnInit {
  DiskList: KarMonthDto[];
  manufactureaddvaluid: number;
  categurys: SelectItem[] = [{
    label: 'کارگاه را انتخاب کنید',
    value: 0
  }] ;
  yy: string ;
  mm: string;
  cols: any[];
  selectedDisk: KarMonthDto;
  newmanuDisk = false;
  displayDialog = false;
  blockSpecial: RegExp = /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئءًّ\s]+$/ ;

  constructor(private api: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.yy = moment().format('jYYYY');
    this.mm = moment().add(-1, 'month').format('jMM');
    this.api.GetDiskList().subscribe(res => {
      this.DiskList = res.data;
    });
    this.api.GetManufactoreeList().subscribe(res => {
      res.data.forEach(element => {
        this.categurys.push({
          label: element.dsK_NAME,
          value: element.id
        });
      });
      this.manufactureaddvaluid = 0;
    });
    this.cols = [
      { field: 'manufactureDto.dsK_NAME', header: 'نام کارگاه' },
      { field: 'manufactureDto.dsK_RATE', header: 'نرخ بیمه' },
      { field: 'dsK_NUM', header: 'تعداد کارکنان' },
      { field: 'dsK_YY', header: 'سال' },
      { field: 'dsK_MM', header: 'ماه' },
      { field: 'dsK_TTOTL', header: 'دستمزد و مزایای ماهانه' },
      { field: 'dsK_TKOSO', header: 'مجموع حق بیمه' }
      ];
  }
  onRowSelect(event) {

  }
  showDialogToAdd() {
    this.displayDialog = true;
    this.newmanuDisk = false;
  }

  save() {
    // tslint:disable-next-line: radix
    if (this.manufactureaddvaluid > 0) {
      this.router.navigate(['/AddDisk'], { queryParams: { id: this.manufactureaddvaluid , yy: this.yy, mm: this.mm} });
     }
  }
}
