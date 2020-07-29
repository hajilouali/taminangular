import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { KarMonthDto, ApiServiceService, Manufacturee } from 'src/app/core/_services/api-service.service';
import { SelectItem } from 'primeng/api';
import moment from 'moment-jalaali';
import { Console } from 'console';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {DialogService} from 'primeng/dynamicdialog';
import { objectpasstoprint, PrintDiskComponent } from '../print-disk/print-disk.component';

@Component({
  selector: 'app-disklist',
  templateUrl: './disklist.component.html',
  styleUrls: ['./disklist.component.css'],
  providers: [DialogService]

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

  constructor(
    private spiner: NgxSpinnerService,
    private api: ApiServiceService,
    private router: Router,
    public dialogService: DialogService,
    ) { }

  ngOnInit(): void {
    this.spiner.show();
    this.yy = moment().format('jYYYY');
    this.mm = moment().add(-1, 'month').format('jMM');
    this.api.GetDiskList().subscribe(res => {
      this.DiskList = res.data;
      this.api.GetManufactoreeList().subscribe(ress => {
        ress.data.forEach(element => {
          this.categurys.push({
            label: element.dsK_NAME,
            value: element.id
          });
        });
        this.manufactureaddvaluid = 0;
        this.spiner.hide();
      });
    });
    this.cols = [
      { field: 'manufactureDto.dsK_NAME', header: 'نام کارگاه' ,width : '20%'},
      { field: 'manufactureDto.dsK_RATE', header: 'نرخ بیمه' , width : '5%'},
      { field: 'dsK_NUM', header: 'تعداد کارکنان' , width : '5%'},
      { field: 'dsK_YY', header: 'سال' ,width : '5%'},
      { field: 'dsK_MM', header: 'ماه',width : '5%' },
      { field: 'dsK_TTOTL', header: 'دستمزد و مزایای ماهانه',width : '30%' },
      { field: 'dsK_TKOSO', header: 'مجموع حق بیمه',width : '30%' }
      ];
  }
  onRowSelect(event) {

  }
  deleterow(rowData: KarMonthDto) {

    Swal.fire({
      title: 'آیا از پاک کردن این لیست اطمینان دارید؟',
      // text: 'در صورت  حذف اطلاعات غیر قابل بازگشت میباشد . ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'لغو',
      confirmButtonText: 'بله پاک کن!'
    }).then((result) => {
      if (result.value) {
        this.spiner.show();
        this.api.deleteWorksMonth(rowData.id).subscribe(res => {
          Swal.fire({
            // position: 'center-end',
            icon: 'success',
            title: 'لیست شما با موفقیت پاک شد',
            showConfirmButton: false,
            timer: 1500
          });
          const index = this.DiskList.indexOf(rowData);
          this.DiskList = this.DiskList.filter((val, i) => i !== index);
          this.spiner.hide();
        });
      }
    });

  }
  printrow(rowData: KarMonthDto) {
    this.spiner.show();
    this.api.GetWorksMonthByKarMonthId(rowData.id).subscribe(res => {
      let object: objectpasstoprint[] = [];

      const rsponst = res.data;
      for (let index = 0; index < rsponst.length; index++) {
        const ele = rsponst[index];
        object.push({
          ManufacName: rowData.manufactureDto.dsK_NAME,
          YY: rowData.dsK_YY.toString(),
          ID: undefined,
          MM: rowData.dsK_MM.toString(),
          ListNum: rowData.dsK_LISTNO,
          Payeman: rowData.manufactureDto.moN_PYM,
          ManufactureCode: rowData.manufactureDto.dsK_ID,
          Karfarma: rowData.manufactureDto.dsK_FARM,
          Address: rowData.manufactureDto.dsK_ADRS,
          rRow: index + 1,
          rBimeh: ele.employeeDto.dsW_ID1,
          rNameFamily: `${ele.employeeDto.dsW_FNAME} ${ele.employeeDto.dsW_LNAME}`,
          rJob: ele.employeeDto.jobs.dsW_OCP,
          rCodeMeli: ele.employeeDto.peR_NATCOD,
          rShenas: ele.employeeDto.dsW_IDNO,
          rFather: ele.employeeDto.dsW_DNAME,
          rStartDate: ele.dsW_SDATE,
          rEnddate: ele.dsW_EDATE,
          rRooz: ele.dsW_DD,
          rMah: Math.round(ele.dsW_MAH),
          rMaz: Math.round(ele.dsW_MAZ),
          rMash: ele.dsW_MASH,
          rGeyreMash: ele.dsW_MASH,
          rBimehprice: ele.dsW_BIME,
          BimehKarfarma: rowData.dsK_TKOSO,
          Bic: rowData.dsK_BIC,
          TotalBim: parseFloat(rowData.dsK_BIC.toString()) + parseFloat(rowData.dsK_TKOSO.toString()) + parseFloat(rowData.dsK_TBIME.toString()),
          Date: moment().format('jYYYY/jMM/jDD'),
          rRozaneh: Math.round(ele.dsW_ROOZ)
        });
      }

      this.spiner.hide();
      const ref = this.dialogService.open(PrintDiskComponent, {
      data: {
        myArray: object
      },
      header: 'پرینت لیست',
      width: '80%'
  });
    });

  }
  downloadfiles(rowData: KarMonthDto) {
    this.spiner.show();
    this.api.createFile(rowData.id).subscribe(res => {
      this.api.getfiles();
      this.spiner.hide();
    });

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
