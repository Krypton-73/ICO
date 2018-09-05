import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authenticationService';

import { baseUrl } from '../_models/baseUrl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  yolo: any;
  httpOptions: any;
  data: any;

  constructor(
    private http: HttpClient
  ) { }

  userKYC(kyc_doc: any, kyc_selfie: any) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = { 
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    }
    console.log(kyc_doc,kyc_selfie);
    return this.http.post(`${baseUrl}/set_kyc`, { 
      email: this.yolo.msg.email, kyc_doc: kyc_doc, kyc_selfie: kyc_selfie
    }, this.httpOptions);
  }


  getBalances() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = { 
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    }
    return this.http.post(`${baseUrl}/get_balances`, { email: this.yolo.msg.email }, this.httpOptions);
  }

  getWallet(currency) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = { 
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    }
    return this.http.post(`${baseUrl}/get_wallet`
    , { email: this.yolo.msg.email, currency: currency }
    , this.httpOptions).pipe(map(
      data=> {
        this.data = data;
        if (this.data.code===200) {
          sessionStorage.setItem(currency, JSON.stringify(this.data.msg.address));
        }
        return data;
      }
    ));
  }

  getRate() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = { 
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    }
    return this.http.post(`${baseUrl}/get_rate`, { email: this.yolo.msg.email }, this.httpOptions);
  }

  buyAcex(currency, amount) {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = { 
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    }
    return this.http.post(`${baseUrl}/buy_acex`
    , { email: this.yolo.msg.email, currency: currency, amount: amount }    
    , this.httpOptions);
  }

  getTxns() {
    this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
    this.httpOptions = { 
      headers: new HttpHeaders({
        'x-access-token': this.yolo.msg.jwt
      })
    }
    return this.http.post(`${baseUrl}/get_txs`, { email: this.yolo.msg.email }, this.httpOptions);
  }

}
