import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  quantityCount: number = 1;
  details: any;
  constructor(private httpService: HttpService, private router: Router, private _activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) {

  }
  ngOnInit() {
    this._activatedRoute.queryParamMap.subscribe((params) => {
      if (params['params'].id)
        this.getProductData(params['params'].id)
    });
  }
  getProductData(id) {
    this.httpService.getSingleProductByID(id).subscribe(resp => {
      this.details = resp.results[0];
    }, err => {
      console.log(err);
    })
  }

  quantity(data: number): void {
    if (data == 0) {
      this.quantityCount = this.quantityCount - 1;
    }
    if (data == 1) {
      this.quantityCount = this.quantityCount + 1;
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
  boBack() {
    let strValue = localStorage.getItem('cart');
    if (strValue) {
      let res = strValue.split(',').map(x => { return parseInt(x) });
      res.push(this.details.id);
      localStorage.setItem('cart', res.toString());
      this.spinner.show();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.spinner.hide();
      }, 2000);
      this.router.navigate(['/cart']);
    } else {
      localStorage.setItem('cart', this.details.id.toString());
      this.spinner.show();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.spinner.hide();
      }, 2000);
      this.router.navigate(['/cart']);
    }
  }

}
