import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productId: any[] = [];
  products: any[] = [];
  productData: any[] = [];
  totalPrice: number = 0;
  constructor(private httpService: HttpService, private router: Router, private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.productData = [];
    this.productId = [];
    this.totalPrice = 0;
    var strValue = localStorage.getItem('cart');
    if (strValue) {
      var res = strValue.split(',').map(x => { return parseInt(x) });
      this.productId = res;
      res.forEach((productId, index) => {
        this.httpService.getSingleProductByID(productId).subscribe(resp => {
          this.productData.push(resp.results[0])
          this.productData.forEach(element => {
            element.quantity = 1;
            if (res.length == 1) {
              this.totalPrice = this.totalPrice + Number(element.price);
            } else {
              if (index > 0) {
                this.totalPrice = this.totalPrice + Number(element.price);
              }
            }
          });
        }, err => {
          console.log(err);
        });
      });
    }
  }
  removeCartProduct(id) {
    this.productData.splice(this.productData.findIndex(product => product.id == id), 1)
    var strValue = localStorage.getItem('cart');
    if (strValue) {
      var res = strValue.split(',').map(x => { return parseInt(x) });
      res.splice(res.findIndex(product => product == id), 1);
      localStorage.setItem('cart', res.toString());
      this.ngOnInit();
    }
  }
  addQuantity(flag: number, product: any): void {
    if (flag == 0) {
      product.quantity = product.quantity + 1;
      this.totalPrice = this.totalPrice + Number(product.price);
    }
    if (flag == 1) {
      product.quantity = product.quantity - 1;
      this.totalPrice = this.totalPrice - Number(product.price);
    }
  }
  removeAllProducts() {
    this.productData = [];
    this.totalPrice = 0;
    localStorage.removeItem('cart');
  }
  checkOut() {
    this.spinner.show();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.spinner.hide();
    }, 300);
    this.router.navigate(['checkout'])
  }
  naviagte(route) {
    this.spinner.show();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.spinner.hide();
    }, 300);
    this.router.navigate([route]);
  }
}
