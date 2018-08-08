import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthenticationService } from '../../services/authenticationService';
import { UserService } from '../../services/user.service';
import { LoaderService } from '../loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { BigNumber } from 'bignumber.js';
import { BuyTokensComponent } from '../../buy-tokens/buy-tokens.component';
import { Balance } from '../../_models/balance';

@Component({
  selector: 'app-homenavs',
  templateUrl: './homenavs.component.html',
  styleUrls: ['./homenavs.component.scss']
})
export class HomenavsComponent implements OnInit {
  balance: Balance;
  data: any;
  user: any;
  
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private load: LoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(this.user.msg);
    this.userService.getBalances().pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===200) {
          this.balance.btcBal = this.data.msg.btc; //Big-num & Round
          this.balance.ethBal = this.data.msg.eth;
          this.balance.ltcBal = this.data.msg.ltc;
          this.balance.acexBal = this.data.msg.acex;
        }
      },
    error => {
      this.toastr.error('Error connecting to server');
    });
  }

  @ViewChild('buyAcex') buyAcex: BuyTokensComponent;
    
  buyAcexTokens() {
    this.buyAcex.show();
  }

  recievedMessage($event) {
    console.log($event);
  }

  logout() {
    this.authenticationService.logout();
  }
}
