import { moment } from 'moment-jalaali';
import { NgxSpinnerService } from 'ngx-spinner';
import { TiketContentDto, TiketDto, UserBio, UserBio1 } from './../../core/_services/api-service.service';
import { ApiServiceService } from 'src/app/core/_services/api-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAppConfig, APP_CONFIG } from 'src/app/app.config';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-tiketcontent',
  templateUrl: './tiketcontent.component.html',
  styleUrls: ['./tiketcontent.component.css'],
  providers: [MessageService]
})
export class TiketcontentComponent implements OnInit {
  tiketid;
  tiketcontent: TiketDto={dataCreate: new Date() ,dataModified:new Date()};
  userinfo: UserBio1 = {};
  TitleContentrespons;
  SelectedFile: File = null;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '10vw',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'متن را وارد نمایید...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'iransans', name: 'iransans'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'Tahoma', name: 'Tahoma'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'italic',
        'fontName'
      ],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
};
  constructor(
    private spiner: NgxSpinnerService,
    private messageService: MessageService,
    private api: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(APP_CONFIG) public appConfig: IAppConfig
    ) {
    this.route.queryParamMap.subscribe(res =>
      {this.tiketid = res.get('id'); });
  }
  ngOnInit(): void {
    this.spiner.show();
    this.api.getTiketContent(this.tiketid).subscribe(res => {
      this.tiketcontent = res.data;
      this.api.isAuthenticated().subscribe(ress => {
        this.userinfo = ress.data;
        this.spiner.hide();
      });
    });

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
    const filtypevalidate = ['jpg', 'png', 'jpge', 'gif', 'zip', 'doc', 'docx', 'pdf'];
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
  save() {
    this.spiner.show();
    if (this.TitleContentrespons) {
      const ticketContent = new FormData();
      if (this.SelectedFile !== null) {
      ticketContent.append('file', this.SelectedFile, this.SelectedFile.name);
    }
      ticketContent.append('text', this.TitleContentrespons);
      this.api.addTicketContent(
       ticketContent,
       this.tiketid
       ).subscribe((data) => {
      this.spiner.hide();
      this.messageService.add({severity: 'success', summary: 'موفق', detail: 'با موفقیت ارسال شد'});
      this.tiketcontent.tiketContents.push({
        id: data.data.id,
        dataCreate: data.data.dataCreate,
        dataModified: data.data.dataModified,
        fileURL: data.data.fileURL,
        isAdminSide: data.data.isAdminSide,
        text: data.data.text,
        tiketId: data.data.tiketId
      });
      this.TitleContentrespons = null;
    }, error => {
      this.spiner.hide();
      this.messageService.add({severity: 'error', summary: 'خطا در ارسال پاسخ', detail: 'خطا در ثبت تیکت جدید ، لطفاً مجدداً تلاش نمایید'});
    });
    }
    else{
      this.spiner.hide();
      this.messageService.add({severity: 'error', summary: 'خطا در ارسال پاسخ', detail: 'لطفاً متن مورد نظر ارسالی خود را وارد نمایید'});

    }

  }
}

