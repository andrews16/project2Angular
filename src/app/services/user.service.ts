import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalsService } from './globals.service';
import { Subject } from 'rxjs';
import { User } from '../models/user';

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
    private router: Router) {
      this.url = this.globals.API_URL + 'auth';
  }

  setCurrentUser(user: any) {
    this.$user.next(<User> user);
    this.currentUser = user;
  }

  // Gets data about the logged in user from the Database
  getSession() {
    const url = `${this.url}/session`;
    this.httpClient.get<User>(url, {withCredentials: true}).subscribe( (data) => {
      const user = new User(data.id, data.username, data.firstName,
        data.lastName, data.userRole);
      this.setCurrentUser(user);
    });
  }

  // Logs in user, sending them to the view-list page
  login(username: string, password: string) {
    const url = `${this.url}/login`;
        const payload = {
      username: username,
      password: password
    };
    this.httpClient.post(url, payload, {withCredentials: true}).subscribe( (user) => {
      this.setCurrentUser(user);
    }, () => {
      this.setCurrentUser(new User());
    }, () => {});
  }

  logout() {
    const url = `${this.url}/logout`;
    this.httpClient.get(url, {withCredentials: true});
    this.setCurrentUser(new User());
  }

}
