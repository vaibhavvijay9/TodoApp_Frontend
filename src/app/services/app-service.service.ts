import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }


  register(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'user/register', data, this.httpOptions); 
  }
  

  login(data){
    return this.http.post(environment.baseUrl + 'user/login', data, this.httpOptions);
  }

  
}
