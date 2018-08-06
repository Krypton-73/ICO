import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { LoaderService } from '../layouts/loading/loading.service';

import { ModalDirective } from 'angular-bootstrap-md';
import { BuyTokensComponent } from '../buy-tokens/buy-tokens.component';
import  BigNumber  from 'bignumber.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  btcBal: BigNumber;
  ethBal: BigNumber;
  ltcBal: BigNumber;
  acexBal: BigNumber;
  buyTokenForm: FormGroup;
  data: any;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private load: LoaderService
  ) { }

  ngOnInit() {
    this.load.show();
    this.userService.getBalances().pipe().subscribe(
      data => {
        this.load.hide();
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

      this.buyTokenForm = this.formBuilder.group({
        currency: ['', Validators.required],
        amountOfAcex: ['', Validators.required]
      });
    }

  get b() {return this.buyTokenForm.controls};
  // @ViewChild('buyAcex') buyAcex: ModalDirective;
  @ViewChild('buyAcex') buyAcex: BuyTokensComponent;
    
  buyAcexTokens() {
    this.buyAcex.show();
  }

  recievedMessage($event) {
    console.log($event);
  }
}
