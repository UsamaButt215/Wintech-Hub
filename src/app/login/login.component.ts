import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  profileForm = new FormGroup({
    email: new FormControl(null,[ Validators.required]),
    password: new FormControl(null, Validators.required),
  });
  constructor(private httpService: HttpService , private router: Router){

  }
  ngOnInit(){
  }
  onSubmit(){
    console.log(this.profileForm.valid)
    this.httpService.login(this.profileForm.getRawValue()).subscribe(resp => {
      console.log(resp);
      localStorage.setItem('user', resp.user.name);
      this.router.navigate(['/']);
    }, err =>{
      console.log(err);
    })
  }
}
