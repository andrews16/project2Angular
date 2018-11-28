import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUrl: string;

  currentUser: User;
  userSub: Subscription;

  constructor(private router: Router,
    private userService: UserService) {
    router.events.subscribe(_ => {
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;
      }
    });

    this.userSub = this.userService.$user.subscribe( (user) =>
      this.currentUser = user
    );

  }
  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
