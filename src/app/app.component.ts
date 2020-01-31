import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  isLoggedIn;
  
  constructor(private myService: AppServiceService){}

  ngOnInit() {
    this.myService.getLoggedInFlagForNav().subscribe(data => {
      this.isLoggedIn = data;
    });

    if (localStorage.getItem('token') != null) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    
  }

}
