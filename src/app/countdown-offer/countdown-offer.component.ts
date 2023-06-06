import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-countdown-offer',
  templateUrl: './countdown-offer.component.html',
  styleUrls: ['./countdown-offer.component.scss']
})
export class CountdownOfferComponent {
  constructor(private router: Router, private _spinner: NgxSpinnerService) {

  }
  navigate(route) {
    this._spinner.show();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this._spinner.hide();
    }, 300);
    this.router.navigate([route]);
  }
}
