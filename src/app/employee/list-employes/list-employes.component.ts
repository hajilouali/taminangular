import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService, ListEmployee } from 'src/app/core/_services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-employes',
  templateUrl: './list-employes.component.html',
  styleUrls: ['./list-employes.component.css']
})
export class ListEmployesComponent implements OnInit {
  list: ListEmployee[];
  display = false;
  newcategory = false;
  datalist: ListEmployee = {};
  constructor(
    private spiner: NgxSpinnerService,
    private api: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.spiner.show();
    this.api.GetListEmployeList().subscribe(res => {
      this.list = res.data;
    });
    this.spiner.hide();
  }
  NewCategury() {
    this.datalist = {};
    this.newcategory = true;
    this.display = true;

  }
  delete(id: number) {
    this.spiner.show();
    Swal.fire({
      title: 'آیا از پاک کردن این دسته بندی اطمینان دارید؟',
      text: 'در صورت این که کارمندی در این دسته بندی باشد ُ دسته بندی کاربران  بدون دسته بندی خواهد شد.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'لغو',
      confirmButtonText: 'بله پاک کن!'
    }).then((result) => {
      if (result.value) {
        this.api.DeleteListEmployee(id).subscribe(res =>{
          Swal.fire({
            // position: 'center-end',
            icon: 'success',
            title: 'دسته بندی شما با موفقیت پاک شد',
            showConfirmButton: false,
            timer: 1500
          });
          this.api.GetListEmployeList().subscribe(ress => this.list = ress.data);
        });
      }
    });
    this.spiner.hide();
  }
  edite(item: number) {
    this.newcategory = false;
    this.api.GetListEmployebyid(item).subscribe(res=>this.datalist=res.data);
    // this.datalist = this.cloneListEmployee(item);
    this.display = true;
  }
  onSubmit() {
    this.spiner.show();
    if (this.newcategory === true) {
      this.api.AddListEmployee(this.datalist).subscribe(res => {
        this.api.GetListEmployeList().subscribe(ress => {this.list = ress.data;this.spiner.hide();});
        this.display = false;
        this.datalist = {};
        this.newcategory = false;

      }, error => {
        console.log('مشکل در برقراری ارتباط با سرور ');
      });
    } else if (this.newcategory === false) {
      this.api.UpdateListEmployee(this.datalist).subscribe(res => {
        this.api.GetListEmployeList().subscribe(ress => {this.list = ress.data;this.spiner.hide();});
        this.display = false;
        this.datalist = {};
        this.newcategory = false;
      }, error => console.log('مشکل در برقراری ارتباط با سرور '));
    }

  }
  cloneListEmployee(c: ListEmployee): ListEmployee {
    const car:ListEmployee =  {};
    for (let prop in c) {
        car[prop] = c[prop];
    }
    return car;
}
}
