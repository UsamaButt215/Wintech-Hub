import { Component } from '@angular/core';

@Component({
  selector: 'app-recharge-screen',
  templateUrl: './recharge-screen.component.html',
  styleUrls: ['./recharge-screen.component.scss']
})
export class RechargeScreenComponent {
  quantityCount: number = 0;
  payment!: google.payments.api.PaymentDataRequest
  buttonType = "buy";
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;
  games: any[] = [
    { id: 1, name: 'Panda Master' },
    { id: 2, name: 'Orion Stars' },
    { id: 3, name: 'Milkyway' },
    { id: 4, name: 'Firekrin' },
    { id: 5, name: 'Ultra Panda' }
  ];
  constructor() {

  }
  ngOnInit() {
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
        totalPrice: '100.00',
        currencyCode: 'USD',
        countryCode: 'US'
      }
    }

  }

  onLoadPaymentData(ddd: any) { }

}
