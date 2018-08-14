import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { DialogService } from "ng2-bootstrap-modal";

// import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { LoaderService } from '../layouts/loading/loading.service';
import { Txn } from '../_models/txn';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './mywallet.component.html',
  styleUrls: ['./mywallet.component.scss']
})
export class MywalletComponent implements OnInit {

  address: any;
  txns: Txn[] = [];
  txnType: any = {
    '0': 'Deposit',
    '1': 'Withdrawal',
    '2': 'Order',
    '3': 'Referral',
    '4': 'Bonus'
  };
  currencyType: any = {
    'btc': 'BTC',
    'eth': 'ETH',
    'ltc': 'LTC',
    'acex': 'ACEX'
  }
  data: any;
  error: any;

  @ViewChild('depositModal') depositModal: ModalComponent;
  @ViewChild('withdrawModal') withdrawModal: ModalComponent;

  constructor(
    private userService: UserService,
    // private dialogService: DialogService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrService,
    public load: LoaderService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getTxns().pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===200) {
          let i: any;
          for (i = 0; i < this.data.msg.length; i++) {
            this.txns.push(this.data.msg[i]);
            if(this.data.msg[i].type===2) {
              this.txns[i].currency = 'acex';
            }
          }
        }
      },
      error => {
        this.error = error;
        if (this.error.code===401) {
          return  this.logout();
        }
        this.toastr.error('Error connecting to server');
      }
    );
  }

  getWallet(currency: string): void {
    if (sessionStorage.getItem(currency)) {
      this.address = JSON.parse(sessionStorage.getItem(currency));
      this.depositModal.show(currency, this.address);
    } else {
      this.address = this.getWalletAddress(currency);
    }
  }

  getWalletAddress(currency: string): any {
    this.userService.getWallet(currency).pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===200) {
          this.address = this.data.msg.address;
          this.depositModal.show(currency, this.address);
        }
      },
      error => {
        this.error = error;
        if (this.error.code===401) {
          this.logout();
        }
        this.toastr.error('Error connecting to server');
      }
    );
  }

  withdraw(currency: string) {
    this.withdrawModal.showWithdraw(currency);
  }

  logout() {
    this.authenticationService.logout().pipe().subscribe(
      data => {
        window.sessionStorage.clear();
        this.router.navigate(['/auth']);
      },
      error => {
        window.sessionStorage.clear();
        this.router.navigate(['/auth']);
      }
    );
  }

}

