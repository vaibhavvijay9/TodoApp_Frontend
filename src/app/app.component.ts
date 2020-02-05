import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './services/app-service.service';
import { Router, NavigationEnd } from '@angular/router'; // import Router and NavigationEnd

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  isLoggedIn;
  
  constructor(private myService: AppServiceService,public router: Router){
    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-157826759-1',
          {
            page_path: event.urlAfterRedirects
          }
        );
      }
    });
  }

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
