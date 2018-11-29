// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import * as auth0 from 'auth0-js';
import { GlobalsService } from './globals.service';

(window as any).global = window;

@Injectable()
export class AuthService {

  auth0 = new this.auth0.WebAuth({
    clientID: '7s94Ea1g8cv6rvhItKDBX4Mfjft61sk2',
    domain: 'project2-doctor-site.auth0.com',
    responseType: 'token id_token',
    redirectUri: `${this.globals.SPA_URL}`,
    scope: 'openid'
  });

  constructor(public router: Router, private globals: GlobalsService) {}

  public login(): void {
    this.auth0.authorize();
  }

  public logout(): void {
    this.auth0.logout({returnTo: `${this.globals.SPA_URL}`});
  }



}
