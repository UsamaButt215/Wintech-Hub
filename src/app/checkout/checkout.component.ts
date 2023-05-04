import { Component, OnInit } from '@angular/core';
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
  constructor(private httpService: HttpService) {

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
        merchantId: '12345678901234567890',
        merchantName: 'Demo Merchant'
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
