import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  yolo: any;
  httpOptions: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(newUser: any) {
    return this.http.post(`${baseUrl}/register`
    , { email: newUser.email, password: sha256(newUser.password)
    , ref_id: newUser.refId, name: newUser.name, mobile: newUser.mobile });
  }

  login(email: string, password: string) {
    return this.http.post(`${baseUrl}/sign_in`, { email: email, password: sha256(password) });
  }

  verifyOtp(userEmail: any, userOtp: any) {
    return this.http.post(`${baseUrl}/validate_otp`, { email: userEmail, otp: userOtp })
    .pipe(map( user => {
      this.user = user;
      if (this.user && this.user.msg.jwt) {
        console.log('map: ' + this.user.msg.jwt);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }));
  }

  verifyEmail(email: string, verCode: string) {
    return this.http.get(`${baseUrl}/verify_email?email=${email}&verCode=${verCode}`);
  }

  resendVerifyEmail(email: string) {
    return this.http.get(`${baseUrl}/resend_verification_mail?email=${email}`);
  }

  requestPassword(email: string) {
    return this.http.get(`${baseUrl}/request_password?email=${email}`);
  }

  resetPassword(email: string, password: string, verCode: string) {
    return this.http.post(`${baseUrl}/reset_password`
    , { email: email, password: sha256(password), verCode: verCode });
  }

  logout() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = { 
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    }
    return this.http.post(`${baseUrl}/logout`, { email: this.yolo.msg.email }, this.httpOptions)
  //   .pipe(map(data => {
  //     return data;
  //   }));
  }

}
