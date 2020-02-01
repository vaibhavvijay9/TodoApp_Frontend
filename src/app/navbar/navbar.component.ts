import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private myService: AppServiceService, private router: Router) { }

  ngOnInit() {}

  logOut(){
    const postData = {
      token : localStorage.getItem('token')
    }
    this.myService.logOut(postData).subscribe(response => {
      console.log(response); 
    });
    localStorage.clear();
    this.myService.setLoggedInFlagForNav(false);
    this.router.navigate(['/login']);
  }

}
