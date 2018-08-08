import {Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { LoaderService } from '../layouts/loading/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.scss']
})
export class BuyTokensComponent implements OnInit {
  closeResult: string;
  currency: string;
  amountOfAcex: number;
  data: any;
  btcBal: any;
  ethBal: any;
  ltcBal: any;
  acexBal: any;
  btcRate: any;
  ethRate: any;
  ltcRate: any;
  balanceUsd: any;
  requiredBal: any;

  @Output() successEvent = new EventEmitter<boolean>();

  constructor(public modalService: NgbModal,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private load: LoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit () {
    this.load.show();
    this.userService.getBalances().pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===200) {
          this.btcBal = this.data.msg.btc; //Big-num & Round
          this.ethBal = this.data.msg.eth;
          this.ltcBal = this.data.msg.ltc;
          this.acexBal = this.data.msg.acex;
        }
      },
    error => {
      this.toastr.error('Error connecting to server');
      this.load.hide();
    });
    this.userService.getRate().pipe().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
        this.btcRate = this.data.msg.btc;
        this.ethRate = this.data.msg.eth;
        this.ltcRate = this.data.msg.ltc;
      },
      error => {
        console.log(error);
      }
    );
    this.load.hide();
  }

  @ViewChild('buyAcex') buyAcex: ModalDirective;

  show() {
    this.buyAcex.show();
  }

  hide() {
    this.buyAcex.hide();
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  balanceCheck(currency, amountOfAcex) {
    switch (currency) {
      case 'btc':
      this.balanceUsd = this.btcBal * this.btcRate;
      break;
      case 'eth':
      this.balanceUsd = this.ethBal * this.ethRate;
      break;
      case 'ltc':
      this.balanceUsd = this.ltcBal * this.ltcRate;
      break;
    }
    this.requiredBal = amountOfAcex * 0.1;

    if(this.requiredBal <= this.balanceUsd) {
      return true;
    }

    return false;

  }

  buyAcexTokens() {
    // this.load.show();
    const bool: boolean = this.balanceCheck(this.currency, this.amountOfAcex);
    if(bool == false) {
      return this.toastr.info('Not Enough funds');
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
