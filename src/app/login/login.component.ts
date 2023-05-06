import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.required),
  });
  constructor(private httpService: HttpService, private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) {

  }
  ngOnInit() {
  }
  onSubmit() {
    if (this.profileForm.valid) {
      this.httpService.login(this.profileForm.getRawValue()).subscribe(resp => {
        if (resp) {
          if (resp.user) {
            localStorage.setItem('user', resp.user.name);
            localStorage.setItem('userId', resp.user.id);
          }
          if (resp.token) {
            localStorage.setItem('token', resp.token);
            this.spinner.show();
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              this.spinner.hide();
            }, 300);
            this.router.navigate(['/']);
            this.toastr.success('Successfully Logged In');
          }
        }
      }, err => {
        if (localStorage.getItem('user') || localStorage.removeItem('userId') || localStorage.removeItem('token')) {
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
          localStorage.removeItem('token');

        }
        this.toastr.error('Please Enter Valid Email and Password');
        console.log(err);
      });
    } else {
      this.toastr.error('Please Enter Valid Email and Password');
    }
  }
}
