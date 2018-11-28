import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalsService } from './globals.service';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { PatientService } from './patient.service';
import { Patient } from '../models/patient';

// User service holds methods connecting to server:
// login, logout, and check session

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;
  $user = new Subject<User>();
  currentUser: User;

  constructor(private httpClient: HttpClient,
     private globals: GlobalsService,
    private router: Router,
    private patientService: PatientService) {
      this.url = this.globals.API_URL;
  }

  setCurrentUser(user: any) {
    // FIX AND CHECK ON THIS! 
    user = new User(user.id, user.username, user.firstName, user.lastName, user.role);
    this.$user.next(user);
    this.currentUser = user;
    if (user && user.role === 'PATIENT') {
      this.patientService.getPatient(new Patient(user.id)).subscribe( (patient) =>
      this.patientService.nextPatient(patient[0]));
    }
  }

  // Gets data about the logged in user from the Database
  getSession() {
    const url = `${this.url}session`;
    return this.httpClient.get<User>(url, {withCredentials: true,
      headers:
      {'Content-Type': 'application/json'}});
  }

  // Logs in user, sending them to the view-list page
  login(username: string, password: string) {
    const url = `${this.url}login`;
        const payload = {
      username: username,
      password: password
    };
    this.httpClient.post<User>(url, JSON.stringify(payload), {
      withCredentials: true,
       headers:
      {'Content-Type': 'application/json'}
    }).subscribe( (user) => {
      this.setCurrentUser(user);
    }, () => {
      this.setCurrentUser(new User());
    }, () => {});
  }

  logout() {
    const url = `${this.url}logout`;
    this.httpClient.get(url,  {headers:
      {'Content-Type': 'application/json'},
      withCredentials: true
    }).subscribe();
        this.setCurrentUser(new User());
        this.patientService.nextPatient(undefined);
  }

}
