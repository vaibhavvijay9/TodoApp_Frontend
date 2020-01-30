import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isLoginFormSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['',Validators.required]
    });
  }

  // getters
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


  loginFormSubmit(){
    this.isLoginFormSubmitted = true;
    
    if(this.loginForm.invalid){
      return;
    }
    console.log(this.loginForm.value);
  }

}
