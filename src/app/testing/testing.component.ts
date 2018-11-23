import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RxService } from '../services/rx.service';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  constructor(private authService: AuthService, private rxService: RxService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  testRx() {

    this.rxService.getList(new Patient(), 35).subscribe( (data) =>
    console.log(data));
  }

}
