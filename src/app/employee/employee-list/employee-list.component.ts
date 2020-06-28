import { HttpEventType } from '@angular/common/http';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
import { getListEmployee, jobs, Place } from './../../core/_services/api-service.service';
import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { Car, CarService } from 'src/app/core/_services/carservice';
import { Employee, ApiServiceService } from 'src/app/core/_services/api-service.service';
import {NationalCodeService, PersianNumberService, PersianLetterService, JDate,
  persianLettersValidator, persianNumbersValidator} from 'ngx-persian';
import {FormControl, FormGroup} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import Swal from 'sweetalert2';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import * as XLSX from 'xlsx';
// import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  categuryexcel: any;
  displayDialogFBF = false;
  SelectedFiledbf: any;
  clonedEmployeeExcel: EmployeeExcel;
  ExcelEmployee: EmployeeExcel[];
  fileexel: DataTransfer;
  fGroup: FormGroup;
  displayDialogExcel = false;
  places: SelectItem[] = [];
  nat: SelectItem[] = [];
  categurys: SelectItem[] = [{
    label: 'بدون دسته بندی',
    value: 0
  }];
  config: NgWizardConfig = {
    selected: 0,
    lang:{ next: 'بعدی', previous: 'قبلی' },
    theme: THEME.circles,

  };
  BDATEval: any;
  displayDialog: boolean;
  public text: jobs ;
  results: jobs[];
  car: Employee = {};
  blockSpecial: RegExp = /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئءًّ\s]+$/ ;
  selectedCar: Employee;
  newCar: boolean;
  cars: Employee[] = [];
  cols: any[];
  constructor(
    private spinner: NgxSpinnerService,
    private persianLetterService: PersianLetterService,
    private persianNumberService: PersianNumberService,
    private api: ApiServiceService,
    private nationalCodeService: NationalCodeService,
    private ngWizardService: NgWizardService) { }


  ngOnInit(): void {
    this.api.GetEmployeList().subscribe(res => {
      this.cars = res.data;
    });
    this.api.getPlaces().subscribe(res => {
      res.data.forEach(element => {
        this.places.push({
          label: element.dsW_IDPLC,
          value: element.dsW_IDPLC,
          title: element.code

        });
      });
    });
    this.api.getcountry().subscribe(res => {
      res.data.forEach(element => {
        this.nat.push({
          value: element.dsW_NAT,
          label: element.dsW_NAT
        })
      });
    });
    this.api.GetListEmployeList().subscribe(res => {
      res.data.forEach(element => {
        this.categurys.push({
          label: element.title,
          value: element.id
        });
      });
    });
    this.cols = [
            { field: 'dsW_ID1', header: 'شماره بیمه' },
            { field: 'dsW_FNAME', header: 'نام' },
            { field: 'dsW_LNAME', header: 'نام خانوادگی' },
            { field: 'dsW_IDNO', header: 'شماره شناسنامه' },
            { field: 'peR_NATCOD', header: 'کد ملی' },
            { field: 'job.dsW_OCP', header: 'شغل' }
        ];

  }
  ngAfterViewInit() {
  }
  search(event) {
    this.api.getjobs(event.query).subscribe(res => {
        const lists = res.data;
        this.results = lists;
    });
}
  showDialogToAdd() {
    this.car = this.cloneCar(null);

    this.newCar = true;
    this.car =  {};
    this.car.dsW_BDATE = '';
    this.text = null;
    this.displayDialog = true;
}
selectedjob(event) {
  this.text = (event as jobs);
  this.car.jobs = this.text;
}
placebouten(event) {
  this.car.dsW_IDPLC = event.value;
}
countrybouten(event) {
  this.car.dsW_NAT = event.value;
}
save() {
        const cars = [...this.cars];
        const normaliz = this.nationalCodeService.normalize(this.car.peR_NATCOD);
        const isvalidd = this.nationalCodeService.isValid(normaliz);
        if (isvalidd) {
          if (this.car.jobs.dsW_OCP) {
            if (this.newCar) {
              this.api.AddEmployee(this.car).subscribe(res => {
                this.api.GetEmployeList().subscribe(ress => {
                  this.cars = ress.data;
                  this.car =  {};
                  this.car.dsW_BDATE = '';
                  this.displayDialog = false;
                });
              }, error => console.log('مشکل در برقراری ارتباط با سرور '));
            } else {
              this.api.UpdateEmployee(this.car).subscribe(res => {
                this.api.GetEmployeList().subscribe(ress => {
                  this.cars = ress.data;
                });
                this.car =  {};
                this.car.dsW_BDATE = '';
                this.displayDialog = false;
                this.newCar = false;
              });
            }
          } else {
            alert('لطفا عنوان شغلی را جستجو و انتخاب نماید');
            this.newCar = false;
            this.displayDialog = true;
            this.text = this.car.jobs;
          }
        } else {
          alert('کد ملی نامعتبر است');
          this.newCar = false;
          this.displayDialog = true;
          this.text = this.car.jobs;
        }
    }
delete() {
  Swal.fire({
    title: 'آیا از پاک کردن این کارمند اطمینان دارید؟',
    text: 'قبل از حذف اطمینان حاصل فرماید که این کارمند در لیست ماهانه ای حضور نداشته باشد.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'لغو',
    confirmButtonText: 'بله پاک کن!'
  }).then((result) => {
    if (result.value) {
      this.api.DeleteEmployee(this.selectedCar.id).subscribe(res => {
        Swal.fire({
          // position: 'center-end',
          icon: 'success',
          title: 'کارمند شما با موفقیت پاک شد',
          showConfirmButton: false,
          timer: 1500
        });
        this.api.GetEmployeList().subscribe(ress => this.cars = ress.data);
        this.car =  {};
        this.displayDialog = false;
      });
    }
  });
    // document.getElementById('closeModalButton').click();
}

onRowSelect(event) {
    // document.getElementById('openModalButton').click();
    this.newCar = false;
    this.car = this.cloneCar(event.data);
    this.car.dsW_BDATE = this.car.dsW_BDATE;
    this.displayDialog = true;
    this.text = this.car.jobs;
}

cloneCar(c: Employee): Employee {
    const car:Employee =  {};
    for (let prop in c) {
        car[prop] = c[prop];
    }
    return car;
}
addexcel() {
this.displayDialogExcel = true;
}
adddbf(){
  this.displayDialogFBF = true;
}
showPreviousStep(event?: Event) {
  this.ngWizardService.previous();
}

showNextStep(event?: Event) {
  this.ngWizardService.next();
}

resetWizard(event?: Event) {
  this.ngWizardService.reset();
}

setTheme(theme: THEME) {
  this.ngWizardService.theme(theme);
}

stepChanged(args: StepChangedArgs) {

}
onFileSelected(event){
  /* wire up file reader */
  this.fileexel = (event.target) as DataTransfer;
}
validateee(image) {
  const ext = image.substring(image.lastIndexOf('.') + 1);
  const filtypevalidate = ['dbf'];
  let result = false;
  filtypevalidate.forEach(element => {
    if (element === ext.toLowerCase())
    {
      result = true;
    }
  });
  if (result) {
  return true;
  } else {
  return false;
 }
}
onFileSelectedDBF(event){
  this.SelectedFiledbf = <File>event.target.files[0];
  if (this.SelectedFiledbf.size > 5242880 || this.validateee(this.SelectedFiledbf.name) === false) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'تنها فایل های مورد قبول با پسوند dbf با حداکثر حجم 5 مگ میباشد',
      });
      this.SelectedFiledbf = null;
    }
}
onUpload() {
  if (this.fileexel.files.length !== 1) {
      throw new Error('Cannot use multiple files');
  }
  const reader: FileReader = new FileReader();
  reader.readAsBinaryString(this.fileexel.files[0]);
  reader.onload = (e: any) => {
    /* create workbook */
    const binarystr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

    /* selected the first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
    const respons = [];
    let index = 1;
    data.forEach(element => {
        let str = JSON.stringify(element);
        str = str.replace('نام' , 'dSW_FNAME');
        str = str.replace('نام خانوادگی' , 'dSW_LNAME');
        str = str.replace('شماره بیمه' , 'dSW_ID1');
        str = str.replace('نام پدر' , 'dSW_DNAME');
        str = str.replace('کد ملی' , 'pER_NATCOD');
        str = str.replace('شماره شناسنامه' , 'dSW_IDNO');
        str = str.replace('محل صدور' , 'dSW_IDPLC');
        str = str.replace('تاریخ تولد' , 'dSW_BDATE');
        str = str.replace('تاریخ صدور' , 'dSW_IDATE');
        str = str.replace('جنسیت' , 'dSW_SEX');
        str = str.replace('ملیت' , 'dSW_NAT');
        str = str.replace('کد شغل' , 'dSW_OCP');
        const converted  = JSON.parse(str);
        converted.id = index;
        respons.push(converted);
        index ++;
    });
    this.ExcelEmployee = respons as EmployeeExcel[];
     // Data will be logged in array format containing objects
    };
}
onRowEditInit(car: EmployeeExcel) {

  this.clonedEmployeeExcel = car;
}

onRowEditSave(car: EmployeeExcel) {
  const variabale  = car;
  this.ExcelEmployee = this.ExcelEmployee.filter(obj => obj !== this.clonedEmployeeExcel);
  this.ExcelEmployee.push(variabale);
  this.clonedEmployeeExcel = {};

}

onRowEditCancel(car: EmployeeExcel , index: number) {
  this.clonedEmployeeExcel = {};
}
onRowEditdelet(data: EmployeeExcel) {
  const variabale  = data;
  this.ExcelEmployee = this.ExcelEmployee.filter(obj => obj !== data);
  this.clonedEmployeeExcel = {};

}
clearExcelEmployee() {
  this.ExcelEmployee = null;
}
saveexcellist() {
  this.spinner.show();
  const listt: EmployeeExcel[] = [];
  this.ExcelEmployee.forEach(element => {
    if (element.dSW_BDATE.length > 0 &&
      element.dSW_DNAME.length > 0 &&
      element.dSW_FNAME.length > 0 &&
      element.dSW_ID1.length > 0 &&
      element.dSW_IDNO.length > 0 &&
      element.dSW_IDPLC.length > 0 &&
      element.dSW_LNAME.length > 0 &&
      element.dSW_NAT.length > 0 &&
      element.dSW_OCP.length > 0 &&
      element.dSW_SEX.length > 0 &&
      element.pER_NATCOD.length > 0 ) {
        listt.push(element);
    }
  });
  const dto = {
    list: listt
  };
  this.api.AddEmployeebylist(dto, this.categuryexcel !== undefined ? this.categuryexcel : 0).subscribe(res => {
    this.cars = res.data;
    this.spinner.hide();
  }, error => {
    this.spinner.hide();
    Swal.fire({
      icon: 'error',
      title: 'خطا',
      text: 'در پرداخزش اطلاعات خطایی رخ داده است. لطفاً مجدداً تلاش نمایید',
    });

  });
  this.displayDialogExcel = false;
}
onUploaddbf() {
  if (this.SelectedFiledbf.size <= 5242880 && this.validateee(this.SelectedFiledbf.name) === true && this.SelectedFiledbf != null) {
    this.spinner.show();
    const fd = new FormData();
    fd.append('Image', this.SelectedFiledbf, this.SelectedFiledbf.name);
    this.api.AddEmployeebyDBF(fd, this.categuryexcel !== undefined ? this.categuryexcel : 0).subscribe(res => {
      this.cars = res.data;
      this.spinner.hide();
      Swal.fire({
              title: 'تایید',
              text: 'اطلاعات شما با موفقیت بارگزاری شد',
              icon: 'success',
              confirmButtonText: 'تایید'
            });
      this.displayDialogFBF = false;
      },
      error =>{
        this.displayDialogFBF = false;
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'در پرداخزش اطلاعات خطایی رخ داده است. لطفاً مجدداً تلاش نمایید',
        });

      });
  } else if (this.SelectedFiledbf.size > 5242880 || this.validateee(this.SelectedFiledbf.name) === false || this.SelectedFiledbf === null) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'تنها فایل های مورد قبول با پسوند dbf با حداکثر حجم 5 مگ میباشد',
      });
      this.spinner.hide();
  }}
}

export interface EmployeeExcel {
  dSW_FNAME?: string;
dSW_LNAME?: string;
dSW_ID1?: string;
dSW_DNAME?: string;
pER_NATCOD?: string;
dSW_IDNO?: string;
dSW_IDPLC?: string;
dSW_BDATE?: string;
dSW_IDATE?: string;
dSW_SEX?: string;
dSW_NAT?: string;
dSW_OCP?: string;
id?: number;
}
