import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { Balance } from '../_models/balance';
import { Rate } from '../_models/rate';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('depositModal') depositModal: ModalDirective;
  @ViewChild('withdrawModal') withdrawModal: ModalDirective;
  
  withdrawForm: FormGroup;
  data: any;
  error: any;
  currency: string;
  balance: Balance;
  rate: Rate;
  address: string;
  to_address: string;
  amount: number;
  amountUSD: number;
  currencyBalance: number;
  QRaddress = '';
  currencyType: any = {
    btc: 'BTC',
    eth: 'ETH',
    ltc: 'LTC',
    acex: 'ACEX'
  };

  @Output() successEvent = new EventEmitter<boolean>();

  constructor(
    public toastr: ToastrService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dataService: DataService
    ) {}

  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
      amount: [0.001, [Validators.required,  Validators.min(0.001), Validators.pattern]],
      to_address: ['', Validators.required]
    });

    this.dataService.currentBalance.subscribe(balance => {
      this.balance = balance;
    });

    this.dataService.currentRate.subscribe(
      rate => {
        this.rate = rate;
      });
  }

  get f() {
    return this.withdrawForm.controls;
  }

  prefixNosByFix(no: any) {
    try {
      if (no !== 0.001) {
        return Number.parseFloat(no).toFixed(2);
      } else {
        return 0.001;
      }
    } catch (e) {
      return 0.001;
    }
  }


  show(currency: string, address: string) {
    this.currency = currency;
    this.address = address;
    if (this.address != null) {
      this.depositModal.show();
    }
  }

  hide() {
    this.depositModal.hide();
  }

  showWithdraw(currency: string) {
    this.currency = currency;
    this.withdrawModal.show();
  }


  hideWithdraw() {
    if(!this.withdrawForm.valid) {
      this.toastr.error('Invalid Inputs');
    }
    else {
    this.userService
    .withdraw(this.currency , this.f.amount.value , this.f.to_address.value)
    .pipe()
    .subscribe(
      data => {
        this.data = data;
        if (this.data.code === 200) {
          this.toastr.success('Withdrawal Successful');
          this.router.navigate(['/wallet']);
        }
        this.withdrawModal.hide();
        this.successEvent.emit(true);
      },
      error => {
        this.error = error;
        if (this.error.code === 500) {
          this.toastr.info(error);
        }else
        {
          this.toastr.error(this.error.error.msg);
        }
      }
    );
    // this.withdrawModal.hide();
    }
  }

  amountOfCurrency(amount: number) {
    let rateOfPurchase: number;
    let currencyBalance: number;
    switch (this.currency) {
      case 'btc':
        rateOfPurchase = this.rate.btc;
        currencyBalance = this.balance.btc;
        break;
      case 'eth':
        rateOfPurchase = this.rate.eth;
        currencyBalance = this.balance.eth;
        break;
      case 'ltc':
        rateOfPurchase = this.rate.ltc;
        currencyBalance = this.balance.ltc;
        break;
    }
    this.amountUSD = amount * rateOfPurchase;
    this.currencyBalance = currencyBalance;
  }

  
  depositClip() {
    this.toastr.info('Copied to Clipboard');
  }
}
