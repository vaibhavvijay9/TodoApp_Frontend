import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isLoginFormSubmitted = false;

  isSuccess;
  message = null;

  constructor(private formBuilder: FormBuilder, private myService: AppServiceService, private router: Router) { }

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

    this.myService.login(this.loginForm.value).subscribe(response => {
      if(response["message"] === 'failure'){
        this.isSuccess = false;
        this.message = 'Wrong username or password.';
      }
      else if(response["message"] === 'success'){
        this.isSuccess = true;
        this.message = null;
        this.router.navigate(['/dashboard']);
      }
    },
      error => {
        // console.log('error in login - ', error);
      })

  }

}
