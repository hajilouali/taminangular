import { Component, OnInit, Inject } from '@angular/core';
import { UserBioInterFace, ApiServiceService } from 'src/app/core/_services/api-service.service';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userdio: UserBioInterFace = null;
  SelectedFile:File=null;

  data: {
    curentpassword: string,
    newpassword: string,
    repassword: string
  } = {
    curentpassword: null,
    newpassword: null,
    repassword: null
  };
  constructor(private router: Router, private api: ApiServiceService, @Inject(APP_CONFIG) public appConfig: IAppConfig) { }

  ngOnInit(): void {
    this.api.userinformation().subscribe(res =>
      {
        this.userdio = res;
      });
  }
  ChangePassword() {

    if (this.data.newpassword !== this.data.repassword) {
      Swal.fire({
        title: 'خطا!',
        text: 'رمز عبور وارد شده با تکرار آن یکسان نمی باشند',
        icon: 'error',
        confirmButtonText: 'تایید'
      });
    } else if (this.data.newpassword === this.data.repassword) {
      this.api.ChangePassword(this.data).subscribe(res => {
        if (res.data === true) {
          Swal.fire({
            title: 'تایید',
            text: 'کلمه عبور شما با موفقیت تغییر یافت',
            icon: 'success',
            confirmButtonText: 'تایید'
          });
          this.data = {
            curentpassword: null,
            newpassword: null,
            repassword: null
          };
        } else if (res.data === false) {
          Swal.fire({
            title: 'خطا!',
            text: 'رمز عبور وارد شده اشتباه میباشد',
            icon: 'error',
            confirmButtonText: 'تایید'
          });

          this.router.navigate(['/login']);
        }
      });
    }
  }
  onFileSelected(event) {

    this.SelectedFile = <File>event.target.files[0];
    if (this.SelectedFile.size > 5242880 || this.validateee(this.SelectedFile.name) === false) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'تنها فایل های مورد قبول با پسوند jpg,png,jpge,gif با حداکثر حجم 5 مگ میباشد',
      });
      this.SelectedFile = null;
    }
  }
  validateee(image) {
    const ext = image.substring(image.lastIndexOf('.') + 1);
    const filtypevalidate = ['jpg', 'png', 'jpge', 'gif'];
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
  onUpload() {
    if (this.SelectedFile.size <= 5242880 && this.validateee(this.SelectedFile.name) === true && this.SelectedFile != null) {
      const fd = new FormData();
      fd.append('Image', this.SelectedFile, this.SelectedFile.name);
      this.api.ChangeProfilePic(fd).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
              console.log('upload progress' + Math.round(event.loaded / event.total * 100) + '%' );
        } else if (event.type === HttpEventType.Response) {
          this.api.userinformation().subscribe(res =>
            {
              this.userdio = res;
              Swal.fire({
                title: 'تایید',
                text: 'تصویر پروفایل شما با موفقیت تغییر یافت',
                icon: 'success',
                confirmButtonText: 'تایید'
              });
            });
        }
        })
    } else if (this.SelectedFile.size > 5242880 || this.validateee(this.SelectedFile.name) === false || this.SelectedFile === null) {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'تنها فایل های مورد قبول با پسوند jpg,png,jpge,gif با حداکثر حجم 5 مگ میباشد',
        });
    }}
}
