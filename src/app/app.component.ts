import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Doctor\'s Office';

  currentUser: User;
  userSubscription: Subscription;

  constructor(private userService: UserService) {
    this.userSubscription = this.userService.$user.subscribe( (data) =>
      this.currentUser = data
    );
    this.userService.getSession();
  }

  logout() {
    this.userService.logout();
  }
}
