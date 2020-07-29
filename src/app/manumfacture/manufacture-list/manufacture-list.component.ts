import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Manufacturee, ApiServiceService } from 'src/app/core/_services/api-service.service';
import { FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manufacture-list',
  templateUrl: './manufacture-list.component.html',
  styleUrls: ['./manufacture-list.component.css']
})
export class ManufactureListComponent implements OnInit {
  ManufactureeList: Manufacturee[];
  selectedManufacturee: Manufacturee;
  cols: any[];
  newmanufacturee = false;
  displayDialog = false;
  blockSpecial: RegExp = /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئءًّ\s]+$/ ;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiServiceService,
    private ngWizardService: NgWizardService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.api.GetManufactoreeList().subscribe(res => {
      this.ManufactureeList = res.data;
    });
    this.cols = [
      { field: 'dsK_ID', header: 'شماره کارگاه' },
      { field: 'dsK_NAME', header: 'نام کارگاه' },
      { field: 'dsK_FARM', header: 'نام کارفرما' },
      { field: 'moN_PYM', header: 'ردیف پیمان' },
      { field: 'dsK_RATE', header: 'نرخ بیمه' }
      ];
    this.spinner.hide();
  }
  onRowSelect(event) {
    this.newmanufacturee = false;
    this.selectedManufacturee = this.cloneManufacturee(event.data);
    this.displayDialog = true;
  }
  showDialogToAdd() {
    this.selectedManufacturee = this.cloneManufacturee(null);
    this.newmanufacturee = true;
    this.selectedManufacturee =  {};
    this.displayDialog = true;
  }
  delete() {
    this.spinner.show();
    Swal.fire({
      title: 'آیا از پاک کردن این کارگاه اطمینان دارید؟',
      text: 'قبل از حذف کارگاه لیست های صادره برای این کارگاه را حذف نمایید..',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'لغو',
      confirmButtonText: 'بله پاک کن!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.api.DeleteManufactoree(this.selectedManufacturee.id).subscribe(res => {
      if (res.data === true) {
        this.api.GetManufactoreeList().subscribe(ress => this.ManufactureeList = ress.data,error=> console.log('مشکل در بارگزاری اطلاعات'));
        this.newmanufacturee = false;
        this.selectedManufacturee =  {};
        this.displayDialog = false;
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'در بارکزاری اطلاعات خطایی رخ داده است لطفاً مجدداً تلاش نمایید',
      });
      this.newmanufacturee = false;
      this.selectedManufacturee =  {};
      this.displayDialog = false;
    });
      }
    });
    this.spinner.hide();
  }
  save() {
    this.spinner.show();
    if (this.newmanufacturee) {
      this.api.AddManufactoree(this.selectedManufacturee).subscribe(res => {
        if (res.data === true) {
        this.api.GetManufactoreeList().subscribe(ress =>
           {this.ManufactureeList = ress.data; this.spinner.hide();},error => console.log('مشکل در بارگزاری اطلاعات'));
        this.newmanufacturee = false;
        this.selectedManufacturee =  {};
        this.displayDialog = false;

        }
      },error=> {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'در بارکزاری اطلاعات خطایی رخ داده است لطفاً مجدداً تلاش نمایید',
        });
        this.newmanufacturee = false;
        this.selectedManufacturee =  {};
        this.displayDialog = false;
        this.spinner.hide();
      });
    } else if (!this.newmanufacturee) {
      this.api.UpdateManufactoree(this.selectedManufacturee).subscribe(res => {
        if (res.data === true) {
        this.api.GetManufactoreeList().subscribe(ress =>
           {this.ManufactureeList = ress.data;this.spinner.hide();},error=> console.log('مشکل در بارگزاری اطلاعات'));
        this.newmanufacturee = false;
        this.selectedManufacturee =  {};
        this.displayDialog = false;

        }
      },error=> {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'در بارکزاری اطلاعات خطایی رخ داده است لطفاً مجدداً تلاش نمایید',
        });
        this.newmanufacturee = false;
        this.selectedManufacturee =  {};
        this.displayDialog = false;
      });
    }

  }
  cloneManufacturee(c: Manufacturee): Manufacturee {
    const car:Manufacturee =  {};
    for (let prop in c) {
        car[prop] = c[prop];
    }
    return car;
  }
}
