import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm : FormGroup;
  isRegistrationFormSubmitted = false;

  isSuccess;
  message = null;

  isAlreadyExists;

  constructor(private formBuilder: FormBuilder, private myService: AppServiceService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['',Validators.required]
    });
  }

  // getters
  get name() { return this.registrationForm.get('name'); }
  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }


  registrationFormSubmit(){
    this.isRegistrationFormSubmitted = true;
    
    if(this.registrationForm.invalid){
      return;
    }
    
    this.myService.register(this.registrationForm.value).subscribe(response => {
      if(response == 0) {
        this.isSuccess = false;
        this.message = 'Registration failed.';
        this.isAlreadyExists = false;
      } 
      else if(response == 1) {
        this.isSuccess = true;
        this.message = 'Registration successful.';
        this.isAlreadyExists = false;
        this.registrationForm.reset();
        this.isRegistrationFormSubmitted = false;
      } 
      else if(response == 2) {
        this.isSuccess = false;
        this.message = 'Registration failed.';
        this.isAlreadyExists = true;
      }
    },
      error => {
        // console.log('error in register - ', error);
      })
  }

}
