import { NgxSpinnerService } from 'ngx-spinner';
import { JalaliPipe } from './../../core/Pipe/jalali-pipe.service';
import { PrintDiskComponent } from './../print-disk/print-disk.component';
import { element, error } from 'protractor';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { Employee, ApiServiceService, Manufacturee, KarMonthDto,
   ListEmployee, WorkMonthDto } from 'src/app/core/_services/api-service.service';
import {SelectItem} from 'primeng/api';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { EnvService } from 'src/app/core/_services/env/env.service';
import moment from 'moment-jalaali';
import Swal from 'sweetalert2';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { objectpasstoprint } from '../print-disk/print-disk.component';
import { tick } from '@angular/core/testing';
declare var Stimulsoft: any;
import {DialogService} from 'primeng/dynamicdialog';
import { IsNumberPipe } from 'angular-pipes';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-add-disk',
  templateUrl: './add-disk.component.html',
  styleUrls: ['./add-disk.component.css'],
  providers: [DialogService]


})
export class AddDiskComponent implements OnInit {
  availableEmployeeByList: any[];
  avalibaleEmployeeByDisk: any[];
  options: any = new Stimulsoft.Viewer.StiViewerOptions();
  viewer: any = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
  yy;
  mm;
  loading = false;
  dragtype =false ;
  masket: string = 'd0/M0/0000';
  diskinfo: KarMonthDto = {manufactureDto:{}};
  displayDialog = false;
  categurys: SelectItem[] = [
    {label: 'انتخاب از لیست کارمنان', value: 0},
    {label: 'انتخاب از دسته بندی کارمنان', value: 1},
    {label: 'طبق لیست ماهه قبل', value: 2},
  ];
  selectedcat = 0;
  orgingavailableEmployee: Employee[];
  orginselectedemployee: WorkMonthDto[] = [];
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
  disktotal = 0;
  selectedwork: WorkMonthDto;
  selectedeEmployes: WorkMonthDto[];
  cols = [
            { field: 'employeeDto.dsW_FNAME', header: 'نام' },
            { field: 'employeeDto.dsW_LNAME', header: 'نام خانوادگی' },
            { field: 'employeeDto.dsW_ID1', header: 'شماره بیمه' },
            { field: 'employeeDto.peR_NATCOD', header: 'شماره ملی' },
            { field: 'dsW_DD', header: 'کارکرد(روز)' },
            { field: 'dsW_MASH', header: 'حقوق و مزایا ماهانه' },
            { field: 'dsW_BIME', header: 'حق بیمه' }
        ];
  constructor(
    private spiner: NgxSpinnerService,
    public dialogService: DialogService,
    private router: Router,
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
   searchemploye(event: string) {
    this.availableEmployee = this.orgingavailableEmployee.filter((x) => x.dsW_FNAME.includes(event) || x.dsW_LNAME.includes(event));
   }
   selectedfilterGlobal(value: string) {
    this.orginselectedemployee = this.selectedeEmployes.filter((x) => x.employeeDto.dsW_FNAME.includes(value) ||
     x.employeeDto.dsW_LNAME.includes(value));

   }
   dragStartbbyclick(car: Employee){
     this.dragStart( event , car);
     this.drop(event);
     this.dragEnd(event);
   }
   dragStartbbyclicklist(car: ListEmployee) {
    this.dragListStart( event , car);
    this.drop(event);
    this.dragListEnd(event);
   }
   dragStartbbyclicklistDisk(car) {

     const listem: WorkMonthDto[] = [];
     const listemploy: Employee[] = [];
     car.karmonth.forEach(ele => {
       if (!ele.dsW_EDATE) {
        listem.push(ele);
        listemploy.push(ele.employeeDto);
       }
     });
     listem.forEach(ele => {
      const dto: WorkMonthDto = {
        dsW_BIME: ele.dsW_BIME,
        dsW_DD: ele.dsW_DD,
        dsW_EDATE: ele.dsW_EDATE,
        dsW_MAH: ele.dsW_MAH,
        dsW_MASH: ele.dsW_MASH,
        dsW_MAZ: ele.dsW_MAZ,
        dsW_MM: this.mm,
        dsW_ROOZ: ele.dsW_ROOZ,
        dsW_SDATE: ele.dsW_SDATE,
        dsW_YY: this.yy,
        dsW_TOTL: ele.dsW_TOTL,
        employeeDto: ele.employeeDto,
        employeID: ele.employeID,
        dsW_ID: this.diskinfo.manufactureDto.dsK_ID,
        dsW_LISTNO: this.diskinfo.dsK_LISTNO,
        dsW_PRATE: 0,
        karMonthDto: null,
        karMonthID: 0,
      } ;
      if (this.mm < 7 && (dto.dsW_MM > 6 && dto.dsW_MM < 13)) {
        dto.dsW_DD = 31;
        dto.dsW_MAH = dto.dsW_ROOZ * dto.dsW_DD;
        dto.dsW_MASH = dto.dsW_MAH + dto.dsW_MAZ;
        dto.dsW_TOTL = dto.dsW_MASH;
        dto.dsW_BIME = Math.trunc((dto.dsW_TOTL / 100) * 7) ;
      }
      if ((this.mm < 13 && this.mm > 6) && dto.dsW_MM < 7) {
          if (moment.jIsLeapYear(this.yy)) {
            dto.dsW_DD = 30;
          } else {
            dto.dsW_DD = 29;
          }
          dto.dsW_MAH = dto.dsW_ROOZ * dto.dsW_DD;
          dto.dsW_MASH = dto.dsW_MAH + dto.dsW_MAZ;
          dto.dsW_TOTL = dto.dsW_MASH;
          dto.dsW_BIME = Math.trunc((dto.dsW_TOTL / 100) * 7) ;
      }
      this.selectedeEmployes.push(dto);
      this.orginselectedemployee.push(dto);
    });
     const index = this.avalibaleEmployeeByDisk.indexOf(car);
     this.avalibaleEmployeeByDisk = this.avalibaleEmployeeByDisk.filter((val, i) => i !== index);
    //  this.avalibaleEmployeeByDisk = this.avalibaleEmployeeByDisk.filter(p => p.id === car.id);
     const newavalebelem = this.availableEmployee.filter(function(item) {
      return !listemploy.includes(item);
     });
     this.availableEmployee  = this.availableEmployee.filter(function(array_el){
      return listemploy.filter(function(anotherOne_el){
         return anotherOne_el.id === array_el.id;
      }).length === 0;
      });
     this.orgingavailableEmployee  = this.orgingavailableEmployee.filter(function(array_el){
        return listemploy.filter(function(anotherOne_el){
           return anotherOne_el.id === array_el.id;
        }).length === 0;
        });
     this.draggedEmployees = null;
     this.worktemp = {};
     this.calculatdisk();

   }
  print() {
    const object123: objectpasstoprint[] = [];
    const queryParams: any = {};
    let index = 1 ;

    if (this.selectedeEmployes.length > 0) {
        this.api.GetISFree().subscribe(result => {
          if (result.data.isFree) {
            this.selectedeEmployes.forEach(ele => {
              object123.push({
                ManufacName: this.diskinfo.manufactureDto.dsK_NAME,
                YY: this.diskinfo.dsK_YY.toString(),
                ID: ele.id,
                MM: this.diskinfo.dsK_MM.toString(),
                ListNum: this.diskinfo.dsK_LISTNO,
                Payeman: this.diskinfo.manufactureDto.moN_PYM,
                ManufactureCode: this.diskinfo.manufactureDto.dsK_ID,
                Karfarma: this.diskinfo.manufactureDto.dsK_FARM,
                Address: this.diskinfo.manufactureDto.dsK_ADRS,
                rRow: index,
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
                BimehKarfarma: this.diskinfo.dsK_TKOSO,
                Bic: this.diskinfo.dsK_BIC,
                TotalBim: parseFloat(this.diskinfo.dsK_BIC.toString()) + parseFloat(this.diskinfo.dsK_TKOSO.toString()) + parseFloat(this.diskinfo.dsK_TBIME.toString()),
                Date: moment().format('jYYYY/jMM/jDD'),
                rRozaneh: Math.round(ele.dsW_ROOZ)
              });
              index ++;
             });
            const ref = this.dialogService.open(PrintDiskComponent, {
              data: {
                myArray: object123
              },
              header: 'پرینت لیست',
              width: '80%'
          });
          } else {
            this.api.userinformation().subscribe(re => {
              if (re.data.userWallet >= (result.data.fe * this.selectedeEmployes.length)) {
                this.selectedeEmployes.forEach(ele => {
                  object123.push({
                    ManufacName: this.diskinfo.manufactureDto.dsK_NAME,
                    YY: this.diskinfo.dsK_YY.toString(),
                    ID: ele.id,
                    MM: this.diskinfo.dsK_MM.toString(),
                    ListNum: this.diskinfo.dsK_LISTNO,
                    Payeman: this.diskinfo.manufactureDto.moN_PYM,
                    ManufactureCode: this.diskinfo.manufactureDto.dsK_ID,
                    Karfarma: this.diskinfo.manufactureDto.dsK_FARM,
                    Address: this.diskinfo.manufactureDto.dsK_ADRS,
                    rRow: index,
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
                    BimehKarfarma: this.diskinfo.dsK_TKOSO,
                    Bic: this.diskinfo.dsK_BIC,
                    TotalBim: this.diskinfo.dsK_BIC + this.diskinfo.dsK_TKOSO + this.diskinfo.dsK_TBIME,
                    Date: moment().format('jYYYY/jMM/jDD'),
                    rRozaneh: Math.round(ele.dsW_ROOZ)
                  });
                  index ++;
                 });
                const ref = this.dialogService.open(PrintDiskComponent, {
                  data: {
                    myArray: object123
                  },
                  header: 'پرینت لیست',
                  width: '80%'
              });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'خطا',
                  text: `برای ثبت و مشاهده این لیست حداقل ${(result.data.fe * this.selectedeEmployes.length)} ريال شارژ در کیف پول نیاز است . لطفاً اقدام به شارژ کیف پول خود نمایید.`,
                });
              }
            });
          }
        })

      }

    // queryParams.myArray = JSON.stringify(object123);

    // const navigationExtras: NavigationExtras = {
    //      queryParams
    // };
    // const url = this.router.createUrlTree(['/PrintDisk'], navigationExtras);
    // window.open(url.toString() , '_blank');
  }
  ngOnInit(): void {
    this.spiner.show();
    this.worktemp = {};
    this.selectedeEmployes = [];
    this.api.GetEmployeList().subscribe(res => {
      this.availableEmployee = res.data;
      this.orgingavailableEmployee = res.data;
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
        this.api.GetDiskList().subscribe(ale => {

          this.avalibaleEmployeeByDisk = [];
          ale.data.forEach(ele => {
            if (ele.manufacturyID === this.diskinfo.manufacturyID) {
            const kar: WorkMonthDto[] = [];
            this.api.GetWorksMonthByKarMonthId(ele.id).subscribe(resss => {
              for (let index = 0; index < resss.data.length; index++) {
                const elem = resss.data[index];
                kar.push(elem);
              }
            });
            this.avalibaleEmployeeByDisk.push({
              Title: `${ele.manufactureDto.dsK_NAME}`,
              YY: ele.dsK_YY,
              MM: ele.dsK_MM,
              id: ele.id,
              karmonth: kar,
            });
            // console.log(this.avalibaleEmployeeByDisk);

            }

          });
        },error=>console.log('مشکل در لود لیست دیسک ها'));
        this.api.GetManufactoreebyid(this.diskinfo.manufacturyID).subscribe(ble => {
          this.diskinfo = {
            dsK_BIMH: 0,
            dsK_DISC: '0',
            dsK_LISTNO: '01',
            dsK_TDD: 0,
            dsK_BIC: 0,
            dsK_NUM: 0,
            dsK_PRATE: ble.data.dsK_RATE - 7,
            dsK_TBIME: 0,
            dsK_KIND: 0,
            dsK_MM: this.mm,
            dsK_TKOSO: 0,
            dsK_TMAH: 0,
            dsK_TMASH: 0,
            dsK_TMAZ: 0,
            dsK_TROOZ: 0,
            dsK_TTOTL: 0,
            dsK_YY: this.yy,
            manufactureDto: ble.data,
            manufacturyID: ble.data.id,
            id: 0,
            dateCreate: moment()
          };
          this.spiner.hide();
        });
      });
      this.diskinfo.dsK_MM = parseInt(this.mm);
      this.diskinfo.dsK_YY = parseInt(this.yy);

    });
  }
  dragStart(event, car: Employee) {
    this.draggedEmployee = car;
  }
  dragListStart(event, car: ListEmployee) {
    this.draggedEmployees = car;
  }
  dragListEnd(event) {
    // this.draggedEmployees = null;
  }
  caldsK_TKOSO(kardto: KarMonthDto, bim: number): number {
    let result = 0;
    result = (bim / 100 ) * 20;
    return result;
  }
  TKOSOchange(event: number) {
    this.diskinfo.dsK_TKOSO = event;
    this.disktotal = parseFloat(this.diskinfo.dsK_BIC.toString()) + parseFloat(this.diskinfo.dsK_TKOSO.toString()) + parseFloat(this.diskinfo.dsK_TBIME.toString());

  }
  BICchange(event: number) {
    this.diskinfo.dsK_BIC = event;
    this.disktotal = parseInt(this.diskinfo.dsK_BIC.toString()) + parseInt(this.diskinfo.dsK_TKOSO.toString()) + parseInt(this.diskinfo.dsK_TBIME.toString());

  }
  calculatdisk() {
    this.diskinfo = {
      dsK_BIMH: 0,
      dsK_DISC: '0',
      dsK_LISTNO: '01',
      dsK_TDD: 0,
      dsK_BIC: 0,
      dsK_NUM: 0,
      dsK_PRATE: this.diskinfo.manufactureDto.dsK_RATE - 7,
      dsK_TBIME: 0,
      dsK_KIND: 0,
      dsK_MM: this.mm,
      dsK_TKOSO: 0,
      dsK_TMAH: 0,
      dsK_TMASH: 0,
      dsK_TMAZ: 0,
      dsK_TROOZ: 0,
      dsK_TTOTL: 0,
      dsK_YY: this.yy,
      manufactureDto: this.diskinfo.manufactureDto,
      manufacturyID: this.diskinfo.manufactureDto.id,
      id: 0,
      dateCreate: moment(),

    };
    let bicari = 0 ;
    for (let index = 0; index < this.selectedeEmployes.length; index++) {
      const ele = this.selectedeEmployes[index];
      this.diskinfo.dsK_NUM ++ ;
      this.diskinfo.dsK_TDD += ele.dsW_DD;
      this.diskinfo.dsK_TBIME += ele.dsW_BIME;
      this.diskinfo.dsK_TMAH += ele.dsW_MAH;
      this.diskinfo.dsK_TMASH +=  ele.dsW_MASH;
      this.diskinfo.dsK_TMAZ += ele.dsW_MAZ;
      this.diskinfo.dsK_TROOZ +=  ele.dsW_ROOZ;
      this.diskinfo.dsK_TTOTL +=  ele.dsW_TOTL;
      bicari += parseFloat((ele.employeeDto.isKarfarma ? 0 : (ele.dsW_MASH / 100) * 3).toString());
      this.diskinfo.dsK_TKOSO += ( ele.dsW_MASH / 100) * 20;
    }
    this.diskinfo.dsK_BIC = Math.ceil(parseFloat(bicari.toString()));
    this.diskinfo.dsK_TBIME = Math.ceil(parseFloat(this.diskinfo.dsK_TBIME.toString()));
    if (this.diskinfo.manufactureDto.dsK_RATE === 10) {
      const karfarma = this.selectedeEmployes.filter(p => p.employeeDto.isKarfarma || p.dsW_EDATE );
      const kargarha = this.selectedeEmployes.filter(p => !p.employeeDto.isKarfarma && !p.dsW_EDATE  );
      if (this.selectedeEmployes.length > 5 ) {
        let newmash = this.diskinfo.dsK_TMASH;
        for (let index = 0; index < karfarma.length; index++) {
          const elem = karfarma[index];
          newmash -= elem.dsW_MASH;
        }
        const offer = (((newmash * 5 ) / kargarha.length) / 100) * 20;
        this.diskinfo.dsK_TKOSO = Math.ceil(this.diskinfo.dsK_TKOSO - offer );
      } else if (this.selectedeEmployes.length < 6 ) {
        let offer = 0 ;
        const oderdto = this.selectedeEmployes.filter(function(item) {
            return !karfarma.includes(item);
          });
        oderdto.forEach(ele => {
          offer += (ele.dsW_MASH / 100) * 20;
        });


        this.diskinfo.dsK_TKOSO = Math.round(this.diskinfo.dsK_TKOSO - offer );
      }
    }
    this.diskinfo.dsK_TKOSO = Math.round(this.diskinfo.dsK_TKOSO);
    this.disktotal = parseInt(this.diskinfo.dsK_BIC.toString()) + parseInt(this.diskinfo.dsK_TKOSO.toString()) +
     parseInt(this.diskinfo.dsK_TBIME.toString());


  }
  addtolist() {
    this.loading = true;

    if (this.draggedEmployee) {
      const draggedCarIndex = this.findIndex(this.draggedEmployee);
      const dto: WorkMonthDto = {
        dsW_BIME: Math.round(this.worktemp.dsW_BIME),
        dsW_DD: this.worktemp.dsW_DD,
        dsW_EDATE: this.worktemp.dsW_EDATE,
        dsW_MAH: this.worktemp.dsW_MAH,
        dsW_MASH: this.worktemp.dsW_MASH,
        dsW_MAZ: this.worktemp.dsW_MAZ,
        dsW_MM: this.mm,
        dsW_ROOZ: this.worktemp.dsW_ROOZ,
        dsW_SDATE: this.worktemp.dsW_SDATE,
        dsW_YY: this.yy,
        dsW_TOTL: this.worktemp.dsW_TOTL,
        employeeDto: this.draggedEmployee,
        employeID: this.draggedEmployee.id,
        dsW_ID: this.diskinfo.manufactureDto.dsK_ID,
        dsW_LISTNO: this.diskinfo.dsK_LISTNO,
        dsW_PRATE: 0,
        karMonthDto: null,
        karMonthID: 0,
      } ;
      this.selectedeEmployes.push(dto);
      this.orginselectedemployee.push(dto);
      this.availableEmployee = this.availableEmployee.filter((id, i) => i !== draggedCarIndex);
      this.orgingavailableEmployee = this.orgingavailableEmployee.filter((id, i) => i !== draggedCarIndex);
      this.draggedEmployee = null;
      this.worktemp = {};
      this.calculatdisk();
      this.displayDialog = false;
    }
    if (this.draggedEmployees) {

        const selectem = this.availableEmployee.filter( p => p.listEmployeeID === this.draggedEmployees.id);
        selectem.forEach(ele => {
          const dto: WorkMonthDto = {
            dsW_BIME: Math.round(this.worktemp.dsW_BIME),
            dsW_DD: this.worktemp.dsW_DD,
            dsW_EDATE: this.worktemp.dsW_EDATE,
            dsW_MAH: this.worktemp.dsW_MAH,
            dsW_MASH: this.worktemp.dsW_MASH,
            dsW_MAZ: this.worktemp.dsW_MAZ,
            dsW_MM: this.mm,
            dsW_ROOZ: this.worktemp.dsW_ROOZ,
            dsW_SDATE: this.worktemp.dsW_SDATE,
            dsW_YY: this.yy,
            dsW_TOTL: this.worktemp.dsW_TOTL,
            employeeDto: ele,
            employeID: ele.id,
            dsW_ID: this.diskinfo.manufactureDto.dsK_ID,
            dsW_LISTNO: this.diskinfo.dsK_LISTNO,
            dsW_PRATE: 0,
            karMonthDto: null,
            karMonthID: 0,
          } ;
          this.selectedeEmployes.push(dto);
          this.orginselectedemployee.push(dto);
          // this.availableEmployee = this.availableEmployee.filter(p => p.id === ele.id);
        });
        this.availableEmployeeByList = this.availableEmployeeByList.filter(p => p.id !== this.draggedEmployees.id);
        this.availableEmployee = this.availableEmployee.filter(function(item) {
          return !selectem.includes(item);
        });
        this.orgingavailableEmployee = this.orgingavailableEmployee.filter(function(item) {
          return !selectem.includes(item);
        });
        this.draggedEmployees = null;
        this.worktemp = {};
        this.calculatdisk();
        this.displayDialog = false;
    }

  }
  calculatebimchange(event?) {

    this.worktemp.dsW_MAH = this.worktemp.dsW_ROOZ * this.worktemp.dsW_DD;
    this.worktemp.dsW_MASH = this.worktemp.dsW_MAH + this.worktemp.dsW_MAZ;
    this.worktemp.dsW_TOTL = this.worktemp.dsW_MASH;
    this.worktemp.dsW_BIME = Math.trunc((this.worktemp.dsW_TOTL / 100) * 7) ;
  }
  calculatebim(event?) {
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
      if(this.worktemp.dsW_DD === undefined||this.worktemp.dsW_DD === null) {
      this.worktemp.dsW_DD = this.mm < 7 ? 31 : this.mm < 12 ? 30 : moment.jIsLeapYear(this.yy) === false ? 29 : 30;

      }
    }
    this.worktemp.dsW_MAH = this.worktemp.dsW_ROOZ * this.worktemp.dsW_DD;
    this.worktemp.dsW_MASH = this.worktemp.dsW_MAH + this.worktemp.dsW_MAZ;
    this.worktemp.dsW_TOTL = this.worktemp.dsW_MASH;
    this.worktemp.dsW_BIME = Math.trunc((this.worktemp.dsW_TOTL / 100) * 7) ;
  }
  drop(event) {
      this.dragtype = false;
      this.worktemp = {
        dsW_ROOZ: this.env.hogogmah,
        dsW_MAZ: this.env.mazayaemah,
        dsW_DD: this.mm < 7 ? 31 : this.mm < 12 ? 30 : moment.jIsLeapYear(this.yy) === false ? 29 : 30

      };
      if (this.draggedEmployee) {
        this.worktemp = {
          dsW_ROOZ: this.env.hogogmah,
          dsW_MAZ: this.draggedEmployee.isKarfarma === true ? 0 : this.env.mazayaemah,
          dsW_DD: this.mm < 7 ? 31 : this.mm < 12 ? 30 : moment.jIsLeapYear(this.yy) === false ? 29 : 30
        }
      }
      if (this.draggedEmployees) {

      }
      this.masket = `d0/${this.mm}/${this.yy}`;
      this.displayDialog = true;

      this.calculatebim();
  }
  dragEnd(event) {
      // this.draggedEmployee = null;
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
  editerow(item: WorkMonthDto) {
    this.draggedEmployee = item.employeeDto;
    this.worktemp.dsW_BIME = item.dsW_BIME;
    this.worktemp.dsW_DD = item.dsW_DD;
    this.worktemp.dsW_EDATE = item.dsW_EDATE;
    this.worktemp.dsW_MAH = item.dsW_MAH;
    this.worktemp.dsW_MASH = item.dsW_MASH;
    this.worktemp.dsW_MAZ = item.dsW_MAZ;
    this.worktemp.dsW_ROOZ = item.dsW_ROOZ;
    this.worktemp.dsW_SDATE = item.dsW_SDATE;
    this.worktemp.dsW_TOTL = item.dsW_TOTL;
    this.dragtype = true;
    this.selectedwork = item;
    this.displayDialog = true;
  }
  edtetolist() {
    const cars = [...this.selectedeEmployes];
    const cars1 = [...this.orginselectedemployee];
    const dto: WorkMonthDto = {
      dsW_BIME: Math.round(this.worktemp.dsW_BIME),
      dsW_DD: this.worktemp.dsW_DD,
      dsW_EDATE: this.worktemp.dsW_EDATE,
      dsW_MAH: this.worktemp.dsW_MAH,
      dsW_MASH: this.worktemp.dsW_MASH,
      dsW_MAZ: this.worktemp.dsW_MAZ,
      dsW_MM: this.mm,
      dsW_ROOZ: this.worktemp.dsW_ROOZ,
      dsW_SDATE: this.worktemp.dsW_SDATE,
      dsW_YY: this.yy,
      dsW_TOTL: this.worktemp.dsW_TOTL,
      employeeDto: this.draggedEmployee,
      employeID: this.draggedEmployee.id,
      dsW_ID: this.diskinfo.manufactureDto.dsK_ID,
      dsW_LISTNO: this.diskinfo.dsK_LISTNO,
      dsW_PRATE: 0,
      karMonthDto: null,
      karMonthID: 0,
    } ;

    cars[this.selectedeEmployes.indexOf(this.selectedwork)] = dto;
    cars1[this.orginselectedemployee.indexOf(this.selectedwork)] = dto;
    this.selectedeEmployes = cars;
    this.orginselectedemployee = cars1;
    this.draggedEmployee = {};
    this.dragtype = false;
    this.selectedwork = null;
    this.calculatdisk();
    this.displayDialog = false;
    this.worktemp = {};
  }
  deletrow(item: WorkMonthDto) {
    // console.log(item);
    const index = this.selectedeEmployes.indexOf(item);
    const index2 = this.orginselectedemployee.indexOf(item);
    this.selectedeEmployes = this.selectedeEmployes.filter((val, i) => i !== index);
    this.orginselectedemployee = this.orginselectedemployee.filter((val, i) => i !== index2);
    this.availableEmployee.push(item.employeeDto);
    this.orgingavailableEmployee.push(item.employeeDto);
    this.dragtype = false;
    this.selectedwork = null;
    this.calculatdisk();
    this.displayDialog = false;
    this.draggedEmployee = null;
  }
  save() {
    this.spiner.show();
    if (this.selectedeEmployes.length > 0) {
      this.api.GetISFree().subscribe(result => {
        if (result.data.isFree) {
          this.api.AddDiskList(this.diskinfo).subscribe(res => {
            const list: WorkMonthDto[] = [];
            this.selectedeEmployes.forEach(ele => {
              ele.karMonthID = res.data.id;
              list.push(ele);
            });
            this.api.AddWorkDiskList(res.data.id, list).subscribe(ress => {
              this.spiner.hide();
              this.router.navigate(['/ListDisk']);
            }, error => {
              this.spiner.hide();
              Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'در فرایند ثبت کارکرد دیسک مشکلی پیش آمده',
              });
            });
          }, error => {
            this.spiner.hide();
            Swal.fire({
              icon: 'error',
              title: 'خطا',
              text: 'در فرایند ثبت  دیسک مشکلی پیش آمده',
            });
          });
        } else {
          this.api.userinformation().subscribe(re => {
            if (re.data.userWallet >= (result.data.fe * this.selectedeEmployes.length)) {
              this.api.AddDiskList(this.diskinfo).subscribe(res => {
                const list: WorkMonthDto[] = [];
                this.selectedeEmployes.forEach(ele => {
                  ele.karMonthID = res.data.id;
                  this.api.AddWorkDiskList(res.data.id, list).subscribe(ress => {
                    this.spiner.hide();
                    this.router.navigate(['/ListDisk']);
                  }, error => {
                    this.spiner.hide();
                    Swal.fire({
                      icon: 'error',
                      title: 'خطا',
                      text: 'در فرایند ثبت کار کرد دیسک مشکلی پیش آمده',
                    });
                  });
                });
              }, error => {
                this.spiner.hide();
                Swal.fire({
                  icon: 'error',
                  title: 'خطا',
                  text: 'در فرایند ثبت  دیسک مشکلی پیش آمده',
                });
              });
            } else {
              this.spiner.hide();
              Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: `برای ثبت و مشاهده این لیست حداقل ${(result.data.fe * this.selectedeEmployes.length)} ريال شارژ در کیف پول نیاز است . لطفاً اقدام به شارژ کیف پول خود نمایید.`,
              });
            }
          });
        }
      })

    }

  }
}
