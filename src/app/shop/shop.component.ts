import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any;
  constructor(private httpService: HttpService, private router: Router) {

  }
  ngOnInit(): void {
    this.httpService.getAllProducts().subscribe(resp => {
      this.products = resp.results;
    }, err => {
      console.log(err);
    });
  }
  addToCart(product: any): void {
    console.log(product);
    let p: string;
    if (localStorage.getItem('cart') && localStorage.getItem('cart') != undefined) {
      p = localStorage.getItem('cart') ? localStorage.getItem('cart')?.toString()?.toString() : '';
      p = p + ','+ product.id
      console.log(p + ','+ product.id)
      localStorage.setItem('cart', p.toString())
    } else {
      localStorage.setItem('cart', product.id.toString())
    }
    // let cartItem: string | null = localStorage.getItem('cart') ? localStorage.getItem('cart') : 'null';
    // if(cartItem != 'null'){
    //   cartItem = product.id;
    //   console.log(cartItem)
    // }else{
    //   cartItem.concat(product.id)
    //   console.log(cartItem)
    // }
    // if (typeof (cartItem) === 'string') {
    //   localStorage.setItem('cart', cartItem);
    // }
    this.router.navigate(['/cart']);
  }
}
