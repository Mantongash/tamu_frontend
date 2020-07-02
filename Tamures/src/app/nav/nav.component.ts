import { Component, OnInit, Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../service/data.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public _dataService: DataService, private router:Router) { }

  data = this._dataService;

  navigate () {
    
  }

  logoutUser(){
    return this._dataService.logOut();
    // this.router.navigateByUrl('/homep');
  }


  ngOnInit(): void {
  }

}
