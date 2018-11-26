import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  API_URL = 'http://DoctorProject-env.yehbw2mt37.us-east-2.elasticbeanstalk.com:8888/';
  //API_URL = 'http://localhost:8888/';
  SPA_URL = 'http://localhost:4200/';

  constructor() { }
}
