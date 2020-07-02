import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  register = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  inputs = {
    username: '',
    password: '',
  };

  error;

  constructor(private dataService: DataService, private router: Router) {}

  newUser() {
    this.dataService.addUser(this.register).subscribe(
      (response) => {
        let message = document.querySelector('#message') as HTMLElement;
        message.style.display = 'block';
        message.textContent = `User ${this.register.username} has been created. You can now log in`;

        window.setTimeout(function () {
          message.style.display = 'none';
        }, 3000);

        let front = document.querySelector('.front') as HTMLElement;
        let back = document.querySelector('.back') as HTMLElement;
        let powered = document.querySelector('.powered') as HTMLElement;
        let loginBtn = document.querySelector('.loginBtn') as HTMLElement;
        front.style.display = 'none';
        back.style.display = 'block';
        powered.style.zIndex = '-1';
        loginBtn.style.zIndex = '3';
      },
      (err) => {
        console.log('error', err)
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 400) {
              let errorDisplay=document.querySelector("#error") as HTMLElement;
              errorDisplay.style.display="block";
              this.error = err.error.password.toString();
              window.setTimeout(()=>{
                errorDisplay.style.display = "none"
              }, 4000)
          } 
           
      }
    }
    );
          
        
}

  loginUser() {
    this.dataService.accessUser(this.inputs).subscribe(
      (response) => {
        localStorage.setItem('token', JSON.stringify(response["auth_token"]))
        console.log(response);
        let message = document.querySelector('#message') as HTMLElement;
        message.style.display = 'block';
        message.textContent = `Welcome ${this.register.username}`;

        // window.setTimeout(function () {
        //   message.style.display = 'none';
        // }, 3000);

        this.router.navigateByUrl('/homep');
      },
      (error) => {
        console.log('error', error);
        
      }
    );
  }

  loginDialog(){
    let front = document.querySelector('.front') as HTMLElement;
    let back = document.querySelector('.back') as HTMLElement;
    let powered = document.querySelector('.powered') as HTMLElement;
    let loginBtn = document.querySelector('.loginBtn') as HTMLElement;
    let account = document.querySelector('#account') as HTMLElement;
    account.style.display = 'none';
    front.style.display = 'none';
    back.style.display = 'block';
    powered.style.zIndex = '-1';
    loginBtn.style.zIndex = '3';
  }

  registerDialog(){
    let front = document.querySelector('.front') as HTMLElement;
    let back = document.querySelector('.back') as HTMLElement;
    let powered = document.querySelector('.powered') as HTMLElement;
    let loginBtn = document.querySelector('.loginBtn') as HTMLElement;
    let noAccount = document.querySelector('#no-account') as HTMLElement;
    noAccount.style.display = 'none';
    front.style.display = 'block';
    back.style.display = 'none';
    powered.style.zIndex = '3';
    loginBtn.style.zIndex = '-1';
  }
  // window.setTimeout(function () {
  //   message.style.display = 'none';
  // }, 3000);

  //     },
  //     (error) => console.log('error', error)
  //   );
  // }

  ngOnInit(): void {}
}
