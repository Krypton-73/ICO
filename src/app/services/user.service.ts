import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authenticationService';

import { baseUrl } from '../_models/baseUrl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  yolo: any;
  httpOptions: any;
  data: any;

  constructor(private http: HttpClient) {}

  setKyc(kyc_doc, kyc_selfie) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    console.log(kyc_doc, kyc_selfie);
    return this.http.post(
      `${baseUrl}/set_kyc`,
      {
        email: this.yolo.msg.email,
        kyc_doc: kyc_doc,
        kyc_selfie: kyc_selfie
      },
      this.httpOptions
    );
  }

  getProfile() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.get(`${baseUrl}/get_profile?email=${this.yolo.msg.email}`, this.httpOptions);
  }

  getBalances() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(
      `${baseUrl}/get_balances`,
      { email: this.yolo.msg.email },
      this.httpOptions
    );
  }

  getWallet(currency) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http
      .post(
        `${baseUrl}/get_wallet`,
        { email: this.yolo.msg.email, currency: currency },
        this.httpOptions
      )
      .pipe(
        map(data => {
          this.data = data;
          if (this.data.code === 200) {
            sessionStorage.setItem(currency, JSON.stringify(this.data.msg.address));
          }
          return data;
        })
      );
  }

  getRate() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(`${baseUrl}/get_rate`, { email: this.yolo.msg.email }, this.httpOptions);
  }

  buyAcex(currency: string, amount: number) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(
      `${baseUrl}/buy_acex`,
      { email: this.yolo.msg.email, currency: currency, amount: amount },
      this.httpOptions
    );
  }

  getTxns() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(`${baseUrl}/get_txs`, { email: this.yolo.msg.email }, this.httpOptions);
  }

  submitTicket(subject: string, message: string) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(
      `${baseUrl}/submit_ticket`,
      { email: this.yolo.msg.email, subject: subject, description: message },
      this.httpOptions
    );
  }

  submitMessage(ticketNo: string, message: string) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(
      `${baseUrl}/submit_message`,
      { email: this.yolo.msg.email, ticket_no: ticketNo, message: message },
      this.httpOptions
    );
  }

  getTickets() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(
      `${baseUrl}/get_tickets`,
      { email: this.yolo.msg.email },
      this.httpOptions
    );
  }

  getTicket(ticketNo: string) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(
      `${baseUrl}/get_tickets/${ticketNo}`,
      { email: this.yolo.msg.email },
      this.httpOptions
    );
  }

  get_refTree() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    };
    return this.http.post(`${baseUrl}/get_refTree`, { email: this.yolo.msg.email }, this.httpOptions);
  }

}
