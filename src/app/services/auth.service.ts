import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  resourceURL: any;

  constructor(
    public http: HttpClient,
    private globals: GlobalsService
  ) {
    this.resourceURL = this.globals.url;
  }

  public isAuthenticated(): boolean {
    return true;
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.resourceURL}` + 'sign_in', JSON.parse(JSON.stringify(data))); // .pipe(map(this.extractData));
  } // , catchError(this.handleError

  signup(data: any): Observable<any> {
    return this.http.post(`${this.resourceURL}` + 'register', data); // .pipe(map(this.extractData));
  }

  verifyotp(data: any): Observable<any> {
    return this.http.post(`${this.resourceURL}` + 'validate_otp', data);
  }

  resend(email: any): Observable<any> {
    return this.http.get(`${this.resourceURL}` + 'resend_verification_mail?email=' + email);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return Observable.throw(errMsg);
  }
}
