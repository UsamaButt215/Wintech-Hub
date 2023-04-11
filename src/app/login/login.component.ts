import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(){

  }
  ngOnInit(){
  }
  onSubmit(){
    console.log(this.profileForm.valid)
  }
}
