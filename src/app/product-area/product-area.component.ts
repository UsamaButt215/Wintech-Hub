import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-product-area',
  templateUrl: './product-area.component.html',
  styleUrls: ['./product-area.component.scss']
})
export class ProductAreaComponent implements OnInit {
  productData: any[] = [];
  constructor(private spinner: NgxSpinnerService, private router: Router, private _httpService: HttpService) { }
  ngOnInit() {
    this._httpService.getAllProducts().subscribe(resp => {
      this.productData = resp.results;
    }, err => {
      console.log(err);
    })
  }
  naviagte(route, id?) {
    this.spinner.show();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.spinner.hide();
    }, 300);
    if (id) {
      this.router.navigate([route], {
        queryParams: {
          id: id
        }
      });
    } else {
      this.router.navigate([route]);
    }
  }
  addToCart(product: any): void {
    let p: string;
    if (localStorage.getItem('cart') && localStorage.getItem('cart') != undefined) {
      p = localStorage.getItem('cart') ? localStorage.getItem('cart')?.toString()?.toString() : '';
      p = p + ',' + product.id
      localStorage.setItem('cart', p.toString())
    } else {
      localStorage.setItem('cart', product.id.toString())
    }
    this.spinner.show();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.spinner.hide();
    }, 300);
    this.router.navigate(['/cart']);
  }
}
