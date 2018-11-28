import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  inputUsername: string;
  inputPassword: string;

  userSubscription: Subscription;

  loginFailed = false;
  missingField = false;
  loading = false;
  constructor(private userService: UserService,
      private router: Router) {  }

// When user object comes in, checks if it is undefined (login error)
// If login is sucessful, the userService will redirect user to proper page.
  ngOnInit() {
    this.userSubscription = this.userService
    .$user.subscribe( (user) => {
      this.loading = false;
      if (!user || !user.id) {
        this.loginFailed = true;
        this.inputPassword = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  login() {
    if (!this.inputUsername || !this.inputPassword) {
      this.missingField = true;
      this.inputPassword = null;
      return;
    } else {
      this.loading = true;
      this.missingField = false;
      this.userService.login(this.inputUsername, this.inputPassword);
    }
  }

}
