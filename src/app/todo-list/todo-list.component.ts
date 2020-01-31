import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  categoryId;
  todoItemsList;

  addItemForm: FormGroup;
  isAddItemFormSubmitted;

  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private router: Router,  private myService: AppServiceService) { 
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = params.get('category_id')
    });

    if (isNaN(this.categoryId)) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {

    this.getListItems();

    this.addItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  // getters
  get name() { return this.addItemForm.get('name'); }
  get date() { return this.addItemForm.get('date'); }


  getListItems(){
    this.myService.getTodoItemsList(this.categoryId).subscribe(response => {
      this.todoItemsList = response;
    });
  }

  addItemFormSubmit(){
    this.isAddItemFormSubmitted = true;

    if(this.addItemForm.invalid){
      return;
    }
  }

  updateTaskStatus(item){
    this.myService.updateTaskStatus(item).subscribe(response => {
      // console.log(response);
      this.getListItems();
    });
  }

  deleteTask(itemId){
    this.myService.deleteTask(itemId).subscribe(response => {
      console.log(response);
      this.getListItems();
    });
  }


}
