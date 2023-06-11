import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {
  payment!: google.payments.api.PaymentDataRequest
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
    country: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
  });
  showGPay: boolean = false;
  statusChangesSubscription: Subscription;
  constructor(private httpService: HttpService, private _toastr: ToastrService, private _spinner: NgxSpinnerService, private el: ElementRef) {

  }
  ngOnInit() {
    this.getPaymentDetails();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.gPayState(true);
      this.statusChangesSubscription = this.checkOutForm.statusChanges.subscribe((status) => {
        if (status === 'VALID') this.gPayState(false);
        if (status !== 'VALID') this.gPayState(true);
      });
    }, 1000);
  }
  // get all product and calculate price
  getPaymentDetails() {
    let strValue = localStorage.getItem('cart');
    if (strValue) {
      let res = strValue.split(',').map(x => { return parseInt(x) });

      let promises = [];
      for (let productId of res) {
        promises.push(this.httpService.getSingleProductByIDs(productId));
      }

      return Promise.all(promises).then(products => {
        let totalPrice = 0;
        for (let product of products) {
          totalPrice += Number(product.results[0].price);
        }
        this.totalPrice = totalPrice;
        this.loadGpay();
        this.showGPay = true;
        this.gPayState(true);
      });
    } else {
      return null;
    }
  }
  // enable or disable gpay button!
  gPayState(state: boolean) {
    let gPayButton = this.el.nativeElement.querySelector('.gpay-card-info-container');
    if (gPayButton) {
      gPayButton.disabled = state;
      if (state == true) {
        gPayButton.style.opacity = 0.5;
      } else {
        gPayButton.style.opacity = 'unset';
      }
    }
  }
  // init gpay after getting total price
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
        totalPrice: this.totalPrice.toString(),
        currencyCode: 'USD',
        countryCode: 'US'
      }
    }
  }
  // google event triggered when payment is done
  onLoadPaymentData(data: any) {
    console.log('onLoadPaymentData', data);
    if (data.detail.paymentMethodData) {
      this._toastr.success("Payment Success!");
      this.checkOutForm.reset();
      this.gPayState(true);
    }
  }
  onClickGpay(ev) {
    if (!this.checkOutForm.valid) {
      ev.stopPropagation();
      this._toastr.error('Please Fill All Required Fields');
    }
  }
  ngOnDestroy(): void {
    this.statusChangesSubscription.unsubscribe();
  }
}

// getPaymentDetails() {
//   let strValue = localStorage.getItem('cart');
//   if (strValue) {
//     let res = strValue.split(',').map(x => { return parseInt(x) });
//     this.productId = res;
//     res.forEach((productId, index) => {
//       this.httpService.getSingleProductByID(productId).subscribe(resp => {
//         this.productData.push(resp.results[0]);
//         this.productData.forEach((element) => {
//           element.quantity = 1;
//           if (res.length == 1) {
//             this.totalPrice = this.totalPrice + Number(element.price);
//           } else {
//             if (index > 0) {
//               this.totalPrice = this.totalPrice + Number(element.price);
//             }
//           }
//         });
//       }, err => {
//         console.log(err);
//       });
//     });
//     this.loadGpay();
//   }
// }