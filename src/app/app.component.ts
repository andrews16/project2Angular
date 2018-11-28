import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { PatientService } from './services/patient.service';
import { Patient } from './models/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Doctor\'s Office';

  currentUser: User;
  userSubscription: Subscription;
  loading = true;

  constructor(private userService: UserService,
     private patientService: PatientService) {
       // Subscribe to changes in the logged in user
    this.userSubscription = this.userService.$user.subscribe( (data) => {
      this.currentUser = data;
      this.loading = false;
    });

    // Get the session (checks cookie for loggeed in upon startup)
    this.userService.getSession().subscribe( (data) => {
      let user;
      // If user logged in, set them as such.
     // User object created like this so the GetFullName field is available.
      if (data) {
        user = new User(data.id, data.username, data.firstName,
          data.lastName, data.role);
      } else {
        user = new User();
      }
      this.userService.setCurrentUser(user);
    }, (err) => {
      console.log('error');
      console.log(err);
    });
  }

}
