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

  date;
  

  getApiResponse;

  // saveRoadmap
  todoNameForm: FormGroup;
  todoNameFormSubmitted;
  nameAlreadyExists;

  constructor(private formBuilder: FormBuilder, private myService: AppServiceService, private router: Router) { }

  ngOnInit() {

    this.getDashboardData();

    this.date = new Date();
    
    this.todoNameForm = this.formBuilder.group({
      todo_name: ['', Validators.required]
    });
  }

  // getters
  get todoName() { return this.todoNameForm.get('todo_name'); }

  getDashboardData(){
    this.myService.getDashboardData().subscribe(response => {
      this.getApiResponse = response;
    });
  }

  goToList(categoryId){
    this.router.navigate(['/dashboard', categoryId ]);
  }

  // 
  todoNameFormSubmit() {
    this.todoNameFormSubmitted = true;
    if (this.todoNameForm.invalid) {
      return;
    }

    // if (this.roadmapAction === 'rename') {
    //   const renamePostData = {
    //     roadmapid: this.currentRowRoadmapId,
    //     roadmap_name: this.roadmapName.value,
    //     rename: 1
    //   };

    //   this.dashboardService.getDashboardData(renamePostData).subscribe(response => {
    //     if (response.status === true && response.statusCode === 200) {
    //       if (response.message === 'Name assigned successfully') {
    //         this.nameAlreadyExists = false;
    //         this.roadmapNameForm.reset();
    //         this.roadmapNameFormSubmitted = false;
    //         $('#saveRoadmapNameModal').modal('hide');
    //         this.getSavedRoadmapList();
    //       }
    //       else if (response.message === 'Roadmap name already exists') {
    //         this.nameAlreadyExists = true;
    //       }
    //     }
    //   });
    // }
  }
}
