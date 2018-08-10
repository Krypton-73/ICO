import {Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { LoaderService } from '../layouts/loading/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import { DataService } from '../services/data.service';
import { Balance } from '../_models/balance';
import { Rate } from '../_models/rate';

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.scss']
})
export class BuyTokensComponent implements OnInit {
  currency: string;
  amountOfAcex: number;
  data: any;
  balance: Balance;
  rate: Rate;
  acexBal: any;
  balanceUsd: any;
  requiredBal: any;

  @Output() successEvent = new EventEmitter<boolean>();

  constructor(public modalService: NgbModal,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private load: LoaderService,
    private toastr: ToastrService,
    public dataService: DataService
  ) {}

  ngOnInit () {
    this.dataService.currentBalance.subscribe(balance => { this.balance = balance });
    this.dataService.currentRate.subscribe(rate => { this.rate = rate });
  }

  @ViewChild('buyAcex') buyAcex: ModalDirective;

  show() {
    this.buyAcex.show();
  }

  hide() {
    this.buyAcex.hide();
  }

  balanceCheck(currency, amountOfAcex) {
    switch (currency) {
      case 'btc':
      this.balanceUsd = this.balance.btc * this.rate.btc;
      break;
      case 'eth':
      this.balanceUsd = this.balance.eth * this.rate.eth;
      break;
      case 'ltc':
      this.balanceUsd = this.balance.ltc * this.rate.ltc;
      break;
    }
    this.requiredBal = amountOfAcex * 0.1;

    if(this.requiredBal <= this.balanceUsd) {
      return true;
    }

    return false;

  }

  buyAcexTokens() {
    const bool: boolean = this.balanceCheck(this.currency, this.amountOfAcex);
    if(bool == false) {
      return this.toastr.warning('Insufficient funds');
    }
    if(bool == true) {
    this.userService.buyAcex(this.currency, this.amountOfAcex)
    .pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===200) {
          this.toastr.success('Tokens Purchased!');
        }
        this.buyAcex.hide();
        this.successEvent.emit(true);
      },
      error => {
        if (error.code===401) {
          this.authenticationService.logout();
          this.toastr.info('Unable to connect to server. Please retry login.');
        }
        this.toastr.error('Insufficient Funds');
      }
    );
  }
    // this.load.hide();
  }
  
}
