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
  naviagte(route) {
    this.spinner.show();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.spinner.hide();
    }, 300);
    this.router.navigate([route]);
  }
}
