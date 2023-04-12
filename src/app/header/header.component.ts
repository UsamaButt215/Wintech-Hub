import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuList: any[] = [
    { 'title': 'Home', 'isActive': 'true', 'navigate': '' },
    { 'title': 'Shop', 'isActive': 'false', 'navigate': '/shop' },
    { 'title': 'Contact Us', 'isActive': 'false', 'navigate': '/contact' },
  ];
  productData: any[] = [];
  totalPrice: number = 0;
  user: string = 'Login'
  constructor(private httpService: HttpService) {

  }
  ngOnInit(): void {
    let localUser = localStorage.getItem('user');
    if (localUser && localUser != 'undefined' && localUser != 'null') {
      this.user = localUser;
    }
    var strValue = localStorage.getItem('cart');
    if (strValue) {
      var res = strValue.split(',').map(x => { return parseInt(x) });
      res.forEach((productId, index) => {
        this.httpService.getSingleProductByID(productId).subscribe(resp => {
          this.productData.push(resp.results[0])
          this.productData.forEach(element => {
            element.quantity = 1;
            if (index > 0)
              this.totalPrice = this.totalPrice + Number(element.price);
          });
        }, err => {
          console.log(err);
        });
      });
    }
  }
  updateMenu(menuTarget: any) {
    this.menuList.forEach(menu => {
      menu.isActive = 'false';
    });
    menuTarget.isActive = 'true';
  }
  removeCartProduct(id) {
    this.productData.splice(this.productData.findIndex(product => product.id == id), 1)
    var strValue = localStorage.getItem('cart');
    if (strValue) {
      var res = strValue.split(',').map(x => { return parseInt(x) });
      res.splice(res.findIndex(product => product == id), 1);
      localStorage.setItem('cart', res.toString());
    }
  }
  logout() {
    let localUser = localStorage.getItem('user');
    if (localUser) {
      localStorage.removeItem('user');
      this.user = 'Login'
    }
  }
}
