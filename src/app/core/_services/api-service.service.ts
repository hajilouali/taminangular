import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
import { EmployeeExcel } from 'src/app/employee/employee-list/employee-list.component';
export enum FactorType {
  PishFactor,
  Factor,
  PendingToAccept
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseurl = `${this.appConfig.apiEndpoint}`;
  constructor(private http: HttpClient , private router: Router, @Inject(APP_CONFIG) private appConfig: IAppConfig) { }
  public login(credentials) {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', credentials.username);
    body = body.set('password', credentials.password);
    body = body.set('grant_type', 'password');
    this.http.post(`${this.appConfig.apiEndpoint}api/v1/Users/Token`, body, {headers: myheader} ).subscribe(
      res => this.authenticate(res),
      error => {
        Swal.fire({
          title: 'خطا!',
          text: 'کاربری با اطلاعات وارد شده یافت نشد',
          icon: 'error',
          confirmButtonText: 'تایید'
        });
       });
  }
  public userinformation() {
   return this.http.get<UserBioInterFace>(`${this.appConfig.apiEndpoint}api/v1/Users/GetCorentUserBio`);
  }
  public authenticate(res) {

    localStorage.setItem('token', res.access_token);

    this.router.navigate(['/Dashboard']);
  }
  public logout() {
    localStorage.removeItem('token');
  }
  public isAuthenticated() {

 return this.http.get<UserBio>(`${this.appConfig.apiEndpoint}api/v1/Users/GetCorentUserBio`);
  }

  public TokenisTrue() {

   return this.http.get<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Users/CheckTokenIsValid`);

  }
  public ChangePassword(dto) {
    return this.http.post<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Users/UpdatePassword`, dto);
  }
  public ChangeProfilePic(Model) {
    return this.http.post(`${this.appConfig.apiEndpoint}api/v1/Users/Addprofilepic`, Model, {
      reportProgress: true,
      observe: 'events',

    });
  }
  public GetEmployeList() {
    return this.http.get<getListEmployee>(`${this.appConfig.apiEndpoint}api/v1/Employee`);
  }
  public GetEmployebyid(id: number) {
    return this.http.get<getEmployee>(`${this.appConfig.apiEndpoint}api/v1/Employee/${id}`);
  }
  public AddEmployee(dto: Employee) {
    return this.http.post<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Employee`, dto);
  }
  public AddEmployeebylist(dto, cat: number) {
    return this.http.post<getListEmployee>(`${this.appConfig.apiEndpoint}api/v1/Employee/AddEmployeeByList/${cat}`, dto);
  }
  public AddEmployeebyDBF(dto, cat: number) {
    return this.http.post<getListEmployee>(`${this.appConfig.apiEndpoint}api/v1/Employee/AddEmployeeByDBF/${cat}`, dto);
  }
  public UpdateEmployee(dto: Employee) {
    return this.http.put<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Employee`, dto);
  }
  public DeleteEmployee(id: number) {
    return this.http.delete<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Employee/${id}`);
  }
  public getjobs(search: string) {
    return this.http.post<getlist<jobs>>(`${this.appConfig.apiEndpoint}api/v1/Employee/GetJobByTitle/${search}`, search);
  }
  public getPlaces() {
    return this.http.get<getlist<Place>>(`${this.appConfig.apiEndpoint}api/v1/Employee/Getplace`);
  }
  public getcountry() {
    return this.http.get<getlist<Country>>(`${this.appConfig.apiEndpoint}api/v1/Employee/Getcountry`);
  }
  public GetListEmployeList() {
    return this.http.get<getlist<ListEmployee>>(`${this.appConfig.apiEndpoint}api/v1/ListEmployes`);
  }
  public GetListEmployebyid(id: number) {
    return this.http.get<get<ListEmployee>>(`${this.appConfig.apiEndpoint}api/v1/ListEmployes/${id}`);
  }
  public AddListEmployee(dto: ListEmployee) {

    return this.http.post<baseDto>(`${this.appConfig.apiEndpoint}api/v1/ListEmployes`, dto);
  }
  public UpdateListEmployee(dto: ListEmployee) {
    return this.http.put<baseDto>(`${this.appConfig.apiEndpoint}api/v1/ListEmployes`, dto);
  }
  public DeleteListEmployee(id: number) {
    return this.http.delete<baseDto>(`${this.appConfig.apiEndpoint}api/v1/ListEmployes/${id}`);
  }
  public GetManufactoreeList() {
    return this.http.get<getlist<Manufacturee>>(`${this.appConfig.apiEndpoint}api/v1/Manufacture`);
  }
  public GetManufactoreebyid(id: number) {
    return this.http.get<get<Manufacturee>>(`${this.appConfig.apiEndpoint}api/v1/Manufacture/${id}`);
  }
  public AddManufactoree(dto: Manufacturee) {

    return this.http.post<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Manufacture`, dto);
  }
  public UpdateManufactoree(dto: Manufacturee) {
    return this.http.put<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Manufacture`, dto);
  }
  public DeleteManufactoree(id: number) {
    return this.http.delete<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Manufacture/${id}`);
  }
  public GetDiskList() {
    return this.http.get<getlist<KarMonthDto>>(`${this.appConfig.apiEndpoint}api/v1/Disk`);
  }
  public GetDiskbyid(id: number) {
    return this.http.get<get<KarMonthDto>>(`${this.appConfig.apiEndpoint}api/v1/Disk/${id}`);
  }
}


export interface UserBio{

  data: {
    id: number,
    userName: number,
    fullName: string,
    email: string,
    isActive: boolean,
    discount: number,
    userAddress: string,
    userPhone: string,
    rollName: string[]
  };
  isSuccess: boolean ;
  statusCode: number;
  message: string;
}
export interface baseDto{
  data: boolean;
  isSuccess: true;
  statusCode: boolean;
  message: string;
}
export interface UserBioInterFace{
  data:
    {
      id: number;
      fullName: string;
      isActive: boolean;
      rollName: string[];
      userPhone: string;
      emplyeCount: number;
      manufacturyCount: number;
      listCount: number;
      userWallet: number;
      userImage: string;
    }
   ;
  isSuccess: true ;
  statusCode: boolean ;
  message: string;
}
export interface getEmployee {
  data: Employee;
  isSuccess: boolean ;
  statusCode: number;
  message: string;
}
export interface getListEmployee {
  data: Employee[];
  isSuccess: boolean ;
  statusCode: number;
  message: string;
}
export interface Employee {
  dsW_ID1?: string;
  dsW_FNAME?: string;
  dsW_LNAME?: string;
  dsW_DNAME?: string;
  dsW_IDNO?: string;
  dsW_IDPLC?: string;
  dsW_IDATE?: string;
  dsW_BDATE?: string;
  dsW_SEX?: string;
  dsW_NAT?: string;
  jobid?: number;
  peR_NATCOD?: string;
  listEmployeeID?: number;
  jobs?: jobs;
  id?: number;
}
export interface getlist<key>{
  data: key[];
  isSuccess: boolean ;
  statusCode: number;
  message: string;
}
export interface get<key>{
  data: key;
  isSuccess: boolean ;
  statusCode: number;
  message: string;
}
export interface jobs {
  dsW_JOB?: string;
  dsW_OCP?: string;
  id?: number;
}
export interface Place {
    code: string;
    dsW_IDPLC: string;
    id: number;
}
export interface Country {
    code: string;
    dsW_NAT: string;
    id: number;
}
export interface ListEmployee{
    title?: string;
    discription?: string;
    userID?: number;
    id?: number;
}
export interface Manufacturee {
  userID?: number;
  dsK_ID?: string;
  dsK_NAME?: string;
  dsK_FARM?: string;
  dsK_ADRS?: string;
  moN_PYM?: string;
  dsK_RATE?: number;
  id?: number;
}
export interface KarMonthDto {
  dateCreate?: Date;
  manufacturyID?: number;
  dsK_KIND?: number;
  dsK_YY?: number;
  dsK_MM?: number;
  dsK_LISTNO?: string;
  dsK_DISC?: string;
  dsK_NUM?: number;
  dsK_TDD?: number;
  dsK_TROOZ?: number;
  dsK_TMAH?: number;
  dsK_TMAZ?: number;
  dsK_TMASH?: number;
  dsK_TTOTL?: number;
  dsK_TBIME?: number;
  dsK_TKOSO?: number;
  dsK_BIC?: number;
  dsK_PRATE?: number;
  dsK_BIMH?: number;
  id?: number;
  manufactureDto?: Manufacturee;
}
export interface WorkMonthDto {
  karMonthID?: number;
  employeID?: number;
  dsW_ID?: string;
  dsW_YY?: number;
  dsW_MM?: number;
  dsW_LISTNO?: string;
  dsW_SDATE?: string;
  dsW_EDATE?: string;
  dsW_DD?: number;
  dsW_ROOZ?: number;
  dsW_MAH?: number;
  dsW_MAZ?: number;
  dsW_MASH?: number;
  dsW_TOTL?: number;
  dsW_BIME?: number;
  dsW_PRATE?: number;
  id?: number;
  karMonthDto?: KarMonthDto;
  employeeDto?: Employee;
}
