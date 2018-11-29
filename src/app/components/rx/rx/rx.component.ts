import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {

  rxInput: any;


  patLastName: string;
  patBday: string;
  patId: number;
  patient: Patient;

  currentUser: User;

  constructor(
    private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }
}
