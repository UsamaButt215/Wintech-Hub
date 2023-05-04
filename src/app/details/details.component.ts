import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  quantityCount: number = 1;
  details: any;
  constructor(private httpService: HttpService, private router: Router, private _activatedRoute: ActivatedRoute) {

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
  navigate() {
    var strValue = localStorage.getItem('cart');
    if (strValue) {
      var res = strValue.split(',').map(x => { return parseInt(x) });
      res.push(this.details.id);
      localStorage.setItem('cart', res.toString());
      this.router.navigate(['/cart']);
    } else {
      localStorage.setItem('cart', this.details.id.toString());
    }
  }
}
