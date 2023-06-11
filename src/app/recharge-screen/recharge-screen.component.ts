import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recharge-screen',
  templateUrl: './recharge-screen.component.html',
  styleUrls: ['./recharge-screen.component.scss']
})
export class RechargeScreenComponent implements AfterViewInit, OnDestroy {
  quantityCount: number = 0;
  payment!: google.payments.api.PaymentDataRequest
  buttonType = "buy";
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;
  games: any[] = [
    { name: 'Panda Master' },
    { name: 'Orion Stars' },
    { name: 'Milkyway' },
    { name: 'Firekrin' },
    { name: 'Ultra Panda' }
  ];
  rechargeForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    gameId: new FormControl(null, [Validators.required]),
    game: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
  });
  formSubscription: Subscription;
  constructor(private _toastr: ToastrService, private el: ElementRef) {

  }
  ngOnInit() {
    this.initGpay();
    this.formSubscription = this.rechargeForm.statusChanges.subscribe((status) => {
      if (status === 'VALID') this.gPayState(false);
      if (status !== 'VALID') this.gPayState(true);
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.gPayState(true);
    }, 100);
  }

  initGpay() {
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
  onLoadPaymentData(event: Event) {
    const paymentData = (event as CustomEvent<google.payments.api.PaymentData>)
    console.log(paymentData);
    console.log(paymentData.detail);
    if (paymentData.detail) {
      this._toastr.success("Payment Success!");
      this.rechargeForm.reset();
      this.gPayState(true);
    }
  }
  gPayState(state: boolean) {
    const gPayButton = this.el.nativeElement.querySelector('.gpay-card-info-container');
    if (gPayButton) {
      if (state == true) {
        gPayButton.disabled = true;
        gPayButton.style.opacity = 0.5;
      } else {
        if (this.rechargeForm.get('amount').value > 0) {
          gPayButton.disabled = false;
          gPayButton.style.opacity = 'unset';
        } else {
          gPayButton.disabled = true;
          gPayButton.style.opacity = 0.5;
        }
      }
    }
  }
  onClickGpay(ev) {
    if (!this.rechargeForm.valid) {
      ev.stopPropagation();
      this._toastr.error('Please Fill All Required Fields');
    }
  }
  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

}
