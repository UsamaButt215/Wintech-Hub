import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  messageForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    subject: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required]),
  });
  constructor(private _httpService: HttpService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.messageForm.valid) {
      this.spinner.show();
      this._httpService.sendMessage(this.messageForm.getRawValue()).subscribe(resp => {
        if (resp.status == true) {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.spinner.hide();
          }, 300);
          this.toastr.success(resp.message);
        }
      }, err => {
        this.toastr.error('Error While Sending Message, Please try again');
      });
    } else {
      this.toastr.error('Please fill All Fields');
    }
  }
}
