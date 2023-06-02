import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  payment!: google.payments.api.PaymentDataRequest
  buttonType = "buy";
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  productId: number[];
  productData: any[] = [];
  totalPrice: number = 0;
  checkOutForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    addressLineOne: new FormControl(null, Validators.required),
    addressLineTwo: new FormControl(null, Validators.required),
    postal: new FormControl(null, Validators.required),
    company: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
  });
  constructor(private httpService: HttpService, private _toastr: ToastrService, private _spinner: NgxSpinnerService) {

  }
  ngOnInit() {
    this.getPaymentDetails()
  }
  loadGpay() {
    this.payment = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: 'BCR2DN4TXK4OJWCG',
        merchantName: 'WINTECHHUB LLC'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: '1',
        currencyCode: 'USD',
        countryCode: 'US'
      }
    }
  }
  getPaymentDetails() {
    var strValue = localStorage.getItem('cart');
    if (strValue) {
      var res = strValue.split(',').map(x => { return parseInt(x) });
      this.productId = res;
      res.forEach((productId, index) => {
        this.httpService.getSingleProductByID(productId).subscribe(resp => {
          this.productData.push(resp.results[0]);
          this.productData.forEach(element => {
            element.quantity = 1;
            if (index > 0)
              this.totalPrice = this.totalPrice + Number(element.price);
          });
        }, err => {
          console.log(err);
        });
      });
      this.loadGpay();
    }
  }
  onLoadPaymentData(data: any) {
    console.log(data);
  }
}
