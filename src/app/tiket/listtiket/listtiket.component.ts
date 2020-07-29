import { ApiServiceService } from 'src/app/core/_services/api-service.service';
import { TiketDto } from './../../core/_services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';



export interface Levels {
  name: string;
  value: number;
  }
@Component({
  selector: 'app-listtiket',
  templateUrl: './listtiket.component.html',
  styleUrls: ['./listtiket.component.css']
})

export class ListtiketComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '10vw',
      minHeight: '0',
      maxHeight: 'auto',
      width: '53vw',
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
  SelectedFile: File = null;

  list: TiketDto[];
  displayDialog = false;
  Level: Levels = {
    name: 'عادی',
    value: 1
  };
  Levels: Levels[] = [
    {
    name: 'عادی',
    value: 1
    },
    {
    name: 'مهم',
    value: 2
    },
    {
    name: 'خیلی مهم',
    value: 3
    }
  ];
  TitleTitke: string  ;
  TitleContent: string;
  constructor(
    private router: Router,
    private spiner: NgxSpinnerService,
    private api: ApiServiceService
  ) { }
  onFileSelected(event) {
    this.spiner.show();
    this.SelectedFile = <File>event.target.files[0];
    if (this.SelectedFile.size > 5242880 || this.validateee(this.SelectedFile.name) === false) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'تنها فایل های مورد قبول با پسوند jpg,png,jpge,gif با حداکثر حجم 5 مگ میباشد',
      });
      this.SelectedFile = null;
    }
    this.spiner.hide();
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
  ngOnInit(): void {
    this.spiner.show();
    this.api.getUserTikets().subscribe(res => {
      this.list = res.data;
      this.spiner.hide();
    });
  }
  NewTiket() {
    this.displayDialog = true;
  }
  TikectContentView(id: number) {
    const idtiket = id;
    this.router.navigate(['/Tiket'], { queryParams: { id : idtiket } });
  }
  save() {
    this.spiner.show();
    if (!this.TitleContent) {
      this.spiner.hide();
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'لطفاً متن پیغام خود را وارد نمایید',
      });
    } else {
      const ticket = new FormData();
      // document = Object.assign({}, this.docLeftForm.value);
      if (this.SelectedFile !== null) {
        ticket.append('file', this.SelectedFile, this.SelectedFile.name);
      }
      ticket.append('title', this.TitleTitke);
      ticket.append('level', this.Level.value.toString());
      ticket.append('text', this.TitleContent);
      this.api.addTicket(ticket).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'موفقیت',
          text: `درخواست پشتیبانی شما با کد ${data.data.id} با موفقت ثبت گردید . کارشناسان ما در اولین فرصت پاسخگوی شما  خواهند بود`,
        });
        this.api.getUserTikets().subscribe(res => {
          this.list = res.data;
          this.spiner.hide();
        });
        this.displayDialog = false;
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'خطا در ثبت تیکت جدید',
        });
      });
    }

  }
}
