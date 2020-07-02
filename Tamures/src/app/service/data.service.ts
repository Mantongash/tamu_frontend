import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { EmailValidator } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  addUserUrl = 'http://127.0.0.1:8000/auth/users/';
  loginUrl = 'http://127.0.0.1:8000/auth/token/login/';




  constructor(private http: HttpClient, private router:Router) {}

   addUser(userData) {
    return this.http.post(this.addUserUrl, userData);
  }

  accessUser(userData) {
    return this.http.post(this.loginUrl, userData);
  }

  // Logged In
  loggedIn(){
    return !!localStorage.getItem("token"); 
  }

  // Log Out
  logOut(){
    return localStorage.removeItem("token"); 
  }
}
