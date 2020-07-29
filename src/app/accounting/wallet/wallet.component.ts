import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { gateways, ApiServiceService, PaymentHisstory } from 'src/app/core/_services/api-service.service';
import Swal from 'sweetalert2';
import { EnvService } from 'src/app/core/_services/env/env.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']

})
export class WalletComponent implements OnInit {
  Price: number = 10000;
  GateWays: gateways[];
  selectedgetway: gateways;
  OfferCode: string ;
  payementHistory: PaymentHisstory[];
  user ;
  constructor(
    private spinner: NgxSpinnerService,
    private env: EnvService,
    private api: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.GateWays = [];
    this.api.userinformation().subscribe(res => {
      this.user = res.data.id;
      this.api.getgetwayes().subscribe(ress => {
        this.GateWays = ress;
        this.selectedgetway = ress[0];
        this.api.getPaymentHisstory().subscribe(resss => {
          this.payementHistory = resss.data;
          this.spinner.hide();
        });
      });


    });
  }
  checkoffer() {

    this.spinner.show();
    if (this.OfferCode && this.Price) {
      this.api.GetCodeOfferStatus(this.OfferCode).subscribe(res => {
        if (res.data.isactive) {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'موفقیت در ثبت کد تخفیف',
            text: ` مبلغ شارژ کیف پول با اعمال ${res.data.offerRate} درصد تخفیف معادل ${this.Price + ((this.Price / 100 ) * res.data.offerRate)} ریال میباشد . `,
          });
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'کد تخفیف وارد شده معتبر نمیباشد!',
          });
          this.OfferCode = '';

        }
      }, error => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'کد تخفیف وارد شده معتبر نمیباشد!',
        });
        this.OfferCode = '';

      });
    } else {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'لطفاً رقم مورد نظر شارژ و کد تخفیف را وارد نمایید!',
      });

    }

  }
  submit() {
    if (this.Price && this.selectedgetway) {
      let url = this.env.PayementUrl ;
      url = `${url + 'pay/' + this.user}/${this.Price}/${this.selectedgetway.value}`;
      if (this.OfferCode) {
      url = url + '/' + this.OfferCode;
      }
      window.open(url);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'لطفاً رقم مورد نظر شارژ و درگاه پرداخت را وارد نمایید!',
      });
    }

  }
}
