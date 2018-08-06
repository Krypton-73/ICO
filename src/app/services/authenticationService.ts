import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { sha256 } from 'js-sha256';
// import { User } from '../_models/user';
import { baseUrl } from '../_models/baseUrl';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(email: string, password: string, refID: string) {
    console.log();
    return this.http.post(`${baseUrl}/register`
    , { email: email, password: sha256(password), ref_id: refID});
  }

  login(email: string, password: string) {
    return this.http.post(`${baseUrl}/sign_in`, { email: email, password: sha256(password) });
  }

  verifyOtp(userEmail: any, userOtp: any) {
    return this.http.post(`${baseUrl}/validate_otp`,{ email: userEmail, otp: userOtp })
    .pipe(map( user => {
      this.user = user;
      if (this.user && this.user.msg.jwt) {
        console.log('map: ' + this.user.msg.jwt);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }));
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/auth']);
  }

}
