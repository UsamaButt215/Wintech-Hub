import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products:any;
  constructor(private httpService: HttpService) {

  }
  ngOnInit(): void {
    this.httpService.getAllProducts().subscribe(resp => {
      console.log(resp);
      this.products = resp.results;
    }, err => {
      console.log(err);
    })
  }

}
