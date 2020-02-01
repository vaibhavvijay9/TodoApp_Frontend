import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../services/app-service.service';
declare var $: any;
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

  actionType;
  category;

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
      taskId: [''],
      taskDescription: ['', Validators.required],
      taskDate: ['', Validators.required],
      categoryId: ['']
    });
  }

  // getters
  get taskDescription() { return this.addItemForm.get('taskDescription'); }
  get taskDate() { return this.addItemForm.get('taskDate'); }


  getListItems(){
    this.myService.getTodoItemsList(this.categoryId).subscribe(response => {
      this.todoItemsList = response;
      if(this.todoItemsList.length > 0){
        this.category = response[0].categoryName;
      }
    });
  }


  setAction(action, task?) {    
    if(action === 'add'){
      this.actionType = 'add';
      this.addItemForm.reset();
      this.isAddItemFormSubmitted = false;
    }
    else if(action === 'edit'){
      this.actionType = 'edit';

      this.addItemForm.patchValue({
        taskId: task.taskId,
        taskDescription: task.taskDescription,
        taskDate: task.taskDate,
        categoryId: this.categoryId
      })
    }
    $('#addNewTask').modal('show');  
  }


  addItemFormSubmit(){
    this.isAddItemFormSubmitted = true;

    if(this.addItemForm.invalid){
      return;
    }

    if(this.actionType === 'add'){
      this.addItemForm.patchValue({
        categoryId: this.categoryId
      })

      this.myService.addTask(this.addItemForm.value).subscribe(response => {
        if(response == 1){
          this.isAddItemFormSubmitted = false;    
          this.addItemForm.reset();
          $('#addNewTask').modal('hide');
        }
        this.getListItems();
      });
    }
    else if(this.actionType === 'edit'){
      this.myService.updateTask(this.addItemForm.value).subscribe(response => {
        if(response == 1){
          this.isAddItemFormSubmitted = false;    
          this.addItemForm.reset();
          $('#addNewTask').modal('hide');
        }
        this.getListItems();
      });
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
