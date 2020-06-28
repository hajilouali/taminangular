import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Employee, ApiServiceService, Manufacturee, KarMonthDto,
   ListEmployee, WorkMonthDto } from 'src/app/core/_services/api-service.service';
import {SelectItem} from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/core/_services/env/env.service';
import moment from 'moment-jalaali';


@Component({
  selector: 'app-add-disk',
  templateUrl: './add-disk.component.html',
  styleUrls: ['./add-disk.component.css']
})
export class AddDiskComponent implements OnInit {
  availableEmployeeByList: any[];
  yy;
  mm;
  dragtype = 0 ;
  masket: string = 'd0/M0/0000';
  diskinfo: KarMonthDto = {
    dsK_BIMH:0,
    dsK_DISC:'',
    dsK_LISTNO:'0',
    dsK_TDD:0,
    dsK_BIC:0,
    dsK_NUM:0,
    dsK_PRATE:0,
    dsK_TBIME:0,
    dsK_KIND:0,
    dsK_MM:0,
    dsK_TKOSO:0,
    dsK_TMAH:0,
    dsK_TMASH:0,
    dsK_TMAZ:0,
    dsK_TROOZ:0,
    dsK_TTOTL:0,
    dsK_YY:0,
    manufactureDto:{},
    manufacturyID:0
  };
  displayDialog = false;
  categurys: SelectItem[] = [
    {label: 'انتخاب از لیست کارمنان', value: 0},
    {label: 'انتخاب از دسته بندی کارمنان', value: 1},
    {label: 'طبق لیست ماهه قبل', value: 2},
  ];
  selectedcat = 0;
  availableEmployee: Employee[];
  draggedEmployee: Employee;
  draggedEmployees: ListEmployee;
  worktemp: {
  dsW_SDATE?: string;
  dsW_EDATE?: string;
  dsW_DD?: number;
  dsW_ROOZ?: number;
  dsW_MAH?: number;
  dsW_MAZ?: number;
  dsW_MASH?: number;
  dsW_TOTL?: number;
  dsW_BIME?: number;
  };
  selectedeEmployes: WorkMonthDto[];
  constructor(
    private env: EnvService,
    private api: ApiServiceService,
    private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(res =>
       {
         this.diskinfo.manufacturyID = parseInt(res.get('id'));
         this.yy = res.get('yy');
         this.mm = res.get('mm');
      });
   }

  ngOnInit(): void {
    this.worktemp = {};
    this.selectedeEmployes = [];
    this.api.GetEmployeList().subscribe(res => {
      this.availableEmployee = res.data;
      this.api.GetListEmployeList().subscribe(ress => {
        this.availableEmployeeByList = [];
        ress.data.forEach(item => {
          const em = this.availableEmployee.filter(p => p.listEmployeeID === item.id);
          if (em.length > 0 ) {
            this.availableEmployeeByList.push({
              Title: item.title,
              id: item.id,
              Employes: em
            });
          }
        });
      });
      this.api.GetManufactoreebyid(this.diskinfo.manufacturyID).subscribe(ress => {
        this.diskinfo.manufactureDto = ress.data;
      });
      this.diskinfo.dsK_MM=parseInt(this.mm);
      this.diskinfo.dsK_YY=parseInt(this.yy);

    });

  }
  dragStart(event, car: Employee) {
    this.draggedEmployee = car;
  }
  dragListStart(event, car: ListEmployee) {
    this.draggedEmployees = car;
  }
  dragListEnd(event) {
    this.draggedEmployees = null;
  }
  addtolist() {

  }
  calculatebim() {
    let startdate = moment(`${this.yy}/${this.mm}/01`, 'jYYYY/jMM/jDD');
    let enddate = moment(`${this.yy}/${this.mm}/${this.mm < 7 ? 31 : this.mm < 12 ? 30 : moment.jIsLeapYear(this.yy) === false
       ? 29 : 30}`, 'jYYYY/jMM/jDD' );
    if ((moment(this.worktemp.dsW_SDATE , 'jYYYY/jMM/jDD').isValid() && this.worktemp.dsW_SDATE !== undefined) ||
    ( moment(this.worktemp.dsW_EDATE , 'jYYYY/jMM/jDD').isValid()) && this.worktemp.dsW_EDATE !== undefined) {
      if (moment(this.worktemp.dsW_SDATE , 'jYYYY/jMM/jDD').isValid()) {
        startdate = moment(this.worktemp.dsW_SDATE , 'jYYYY/jMM/jDD');
      }
      if (moment(this.worktemp.dsW_EDATE , 'jYYYY/jMM/jDD').isValid()) {
        enddate = moment(this.worktemp.dsW_EDATE , 'jYYYY/jMM/jDD');

      }
      const dd =  enddate.format('jDD') - startdate.format('jDD');
      this.worktemp.dsW_DD = dd ;
    } else {
      this.worktemp.dsW_DD = this.mm < 7 ? 31 : this.mm < 12 ? 30 : moment.jIsLeapYear(this.yy) === false ? 29 : 30;
    }
    this.worktemp.dsW_MAH = this.worktemp.dsW_ROOZ * this.worktemp.dsW_DD;
    this.worktemp.dsW_MASH = this.worktemp.dsW_MAH + this.worktemp.dsW_MAZ;
    this.worktemp.dsW_TOTL = this.worktemp.dsW_MASH;
    this.worktemp.dsW_BIME = (this.worktemp.dsW_TOTL / 100) * 7;
  }
  drop(event) {
      if (this.draggedEmployee) {
        this.dragtype = 0 ;

          // const draggedCarIndex = this.findIndex(this.draggedEmployee);
          // this.selectedeEmployes = [...this.selectedeEmployes, this.draggedEmployee];
          // this.availableEmployee = this.availableEmployee.filter((id, i) => i !== draggedCarIndex);
          // this.draggedEmployee = null;
      }
      if (this.draggedEmployees) {
        this.dragtype = 1;


        // const selectem = this.availableEmployee.filter( p => p.listEmployeeID === this.draggedEmployees.id);
        // selectem.forEach(ele => {
        //   this.selectedeEmployes.push(ele);
        //   this.availableEmployee = this.availableEmployee.filter(p => p.id === ele.id);
        // });
        // this.availableEmployeeByList = this.availableEmployeeByList.filter(p => p.id !== this.draggedEmployees.id);
        // this.draggedEmployees = null;
      }
      this.masket = `d0/${this.mm}/${this.yy}`;
      this.displayDialog = true;
      this.worktemp = {
        dsW_ROOZ: this.env.hogogmah,
        dsW_MAZ: this.env.mazayaemah,
        dsW_DD: this.mm < 7 ? 31 : this.mm < 12 ? 30 : moment.jIsLeapYear(this.yy) === false ? 29 : 30

      };
      this.calculatebim();
  }
  dragEnd(event) {
      this.draggedEmployee = null;
  }
  findIndex(car: Employee) {
      let index = -1;
      for(let i = 0; i < this.availableEmployee.length; i++) {
          if (car.id === this.availableEmployee[i].id) {
              index = i;
              break;
          }
      }
      return index;
  }
}
