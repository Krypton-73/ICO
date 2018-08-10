import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authenticationService';
import { UserService } from '../../services/user.service';
import { LoaderService } from '../loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { BigNumber } from 'bignumber.js';
import { BuyTokensComponent } from '../../buy-tokens/buy-tokens.component';
import { DataService } from '../../services/data.service';
import { Balance } from '../../_models/balance';
import { Rate } from '../../_models/rate';

@Component({
  selector: 'app-homenavs',
  templateUrl: './homenavs.component.html',
  styleUrls: ['./homenavs.component.scss']
})
export class HomenavsComponent implements OnInit {
  data: any;
  user: any;
  balance: Balance;
  rate: Rate;
  
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private load: LoaderService,
    private toastr: ToastrService,
    public dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));

    this.load.show();
    this.userService.getBalances().pipe().subscribe(
      data => {  
      this.data = data;
      if (this.data.code===200) {
        this.balance = this.data.msg;
        this.newBalance();
      }
    },
    error => {
      this.toastr.error('Error connecting to server');
    });
    this.userService.getRate().pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===200) {
        this.rate = this.data.msg;
        this.newRate();
        }
      },
      error => {
        console.log(error);
      }
    );
    this.load.hide();
  }

  @ViewChild('buyAcex') buyAcex: BuyTokensComponent;
    
  buyAcexTokens() {
    this.buyAcex.show();
  }

  recievedMessage($event) {
    console.log($event);
  }

  newBalance() {
    if (this.balance) {
    console.log(this.balance);
    this.dataService.newBalance(this.balance);
    }
  }

  newRate() {
    if (this.rate) {
      this.dataService.newRate(this.rate);
    }
  }

  logout() {
    this.authenticationService.logout().pipe().subscribe();
    window.sessionStorage.clear();
    this.router.navigate(['/auth']);
  }
}
