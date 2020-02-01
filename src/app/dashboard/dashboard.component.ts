import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router'; 
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  name: string;
  date;

  getApiResponse;

  // 
  categoryForm: FormGroup;
  categoryFormSubmitted;
  nameAlreadyExists;


  actionType;

  constructor(private formBuilder: FormBuilder, private myService: AppServiceService, private router: Router) { }

  ngOnInit() {


    // Decode the String
    if(localStorage.getItem('token')){
      const decodedString = atob(localStorage.getItem('token'));
    this.name = (decodedString.split('-'))[0];
    }

    this.getDashboardData();

    this.date = new Date();
    
    this.categoryForm = this.formBuilder.group({
      categoryId: [''],
      categoryName: ['', Validators.required]
    });
  }

  // getters
  get categoryName() { return this.categoryForm.get('categoryName'); }


  getDashboardData(){
    this.myService.getDashboardData().subscribe(response => {
      this.getApiResponse = response;
    });
  }

  goToList(categoryId){
    this.router.navigate(['/dashboard', categoryId ]);
  }


  setAction(action, category?) {    
    this.nameAlreadyExists = false;
    if(action === 'add'){
      this.actionType = 'add';
      this.categoryForm.reset();
    }
    else if(action === 'edit'){
      this.actionType = 'edit';
      this.categoryForm.patchValue({
        categoryId: category.categoryId,
        categoryName: category.categoryName
      })
    }
    $('#addNewCategory').modal('show');  
  }

  // 
  categoryFormSubmit() {
    this.categoryFormSubmitted = true;
    if (this.categoryForm.invalid) {
      return;
    }

    if(this.actionType === 'add'){
      this.myService.addCategory(this.categoryForm.value).subscribe(response => {
        if(response == 1){
          this.categoryFormSubmitted = false;    
          this.categoryForm.reset();
          $('#addNewCategory').modal('hide');
          this.nameAlreadyExists = false;
          this.getDashboardData();
        }
        else if(response == 2){
          this.nameAlreadyExists = true;
        }
      });
    }
    else if(this.actionType === 'edit'){
      this.myService.updateCategory(this.categoryForm.value).subscribe(response => {
        if(response == 1){
          this.categoryFormSubmitted = false;    
          this.categoryForm.reset();
          $('#addNewCategory').modal('hide');
          this.nameAlreadyExists = false;
          this.getDashboardData();
        }
        else if(response == 2){
          this.nameAlreadyExists = true;
        }
      });
    }
  }


  deleteCategory(categoryId){
    this.myService.deleteCategory(categoryId).subscribe(response => {
      this.getDashboardData();
    });
  }


}
