import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    { 'title': 'About Us', 'isActive': 'false', 'navigate': '/about-us' },
    { 'title': 'Contact Us', 'isActive': 'false', 'navigate': '/contact' },
    { 'title': 'Recharge', 'isActive': 'false', 'navigate': '/recharge' },
  ];
  productData: any[] = [];
  totalPrice: number = 0;
  user: string = 'Login'
  menuToggle:boolean = false;
  constructor(private httpService: HttpService, private spinner: NgxSpinnerService, private router: Router) {

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
  updateMenu(menuTarget: any) {
    this.menuList.forEach(menu => {
      menu.isActive = 'false';
    });
    menuTarget.isActive = 'true';
    this.naviagte(menuTarget.navigate)
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
  naviagte(route) {
    this.spinner.show();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.spinner.hide();
    }, 300);
    this.router.navigate([route]);
  }
  toggleMenu(){
    this.menuToggle = !this.menuToggle
  }
}
