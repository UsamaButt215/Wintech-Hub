import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any;
  constructor(private httpService: HttpService, private router: Router, private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.httpService.getAllProducts().subscribe(resp => {
      this.products = resp.results;
    }, err => {
      console.log(err);
    });
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
  naviagteById(id) {
    this.spinner.show();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.spinner.hide();
    }, 300);
    this.router.navigate(
      ['/details'],
      { queryParams: { id: id } }
    );
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
