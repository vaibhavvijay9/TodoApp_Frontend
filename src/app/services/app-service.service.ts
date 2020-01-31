import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private loggedInFlagForNavSubject = new Subject<any>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // START
  setLoggedInFlagForNav(myFlag) {
    this.loggedInFlagForNavSubject.next(myFlag);
  }

  getLoggedInFlagForNav(): Observable<any> {
    return this.loggedInFlagForNavSubject.asObservable();
  }
  // END


  register(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'user/register', data, this.httpOptions); 
  }
  

  login(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'user/login', data, this.httpOptions)
      .pipe(map(response => {
        if(response["message"] === 'success'){
            localStorage.setItem('token', response.token);
            this.setLoggedInFlagForNav(true);  
        }
        return response;
      })
      );
  }

  addTask(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'task/addtask', data, this.httpOptions); 
  }

  getDashboardData() {
    return this.http.get<any>(environment.baseUrl + 'task/dashboard', this.httpOptions);
  }

  getTodoItemsList(data): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'task/getTask/'+data, this.httpOptions); 
  }

  updateTaskStatus(data): Observable<any> {
    return this.http.put<any>(environment.baseUrl + 'task/updateTaskStatus', data, this.httpOptions); 
  }

  deleteTask(data): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'task/deleteTask/'+data, this.httpOptions); 
  }
  
}
