import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  quantityCount: number = 0;
  constructor() {

  }
  ngOnInit() {

  }
  quantity(data: number): void {
    console.log(data)
    if (data == 0) {
      this.quantityCount = this.quantityCount - 1;
    }
    if(data == 1){
      this.quantityCount = this.quantityCount + 1;
    }
  }

}
