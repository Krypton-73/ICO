import { Component, OnInit, ViewChild } from '@angular/core';
// import { DialogService } from "ng2-bootstrap-modal";

// import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { LoaderService } from '../layouts/loading/loading.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './mywallet.component.html',
  styleUrls: ['./mywallet.component.scss']
})
export class MywalletComponent implements OnInit {

  address: any;
  txns = [];
  txnType: any = {
    '0': 'Deposit',
    '1': 'Withdrawal',
    '2': 'Order',
    '3': 'Referral',
    '4': 'Bonus'
  };
  data: any;
  @ViewChild('depositModal') depositModal: ModalComponent;

  constructor(
    private userService: UserService,
    // private dialogService: DialogService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrService,
    public load: LoaderService
  ) { }

  ngOnInit() {
    this.userService.getTxns().pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===401) {
          return this.authenticationService.logout();
        }
        let i: any;
        for (i = 0; i < this.data.msg.length; i++) {
          this.txns.push(this.data.msg[i]);
        }
      }
    );
  }

  getWalletAddress(currency: string): any {
    this.userService.getWallet(currency).pipe().subscribe(
      data => {
        this.data = data;
        // if (this.data.code === 401) {
        //   this.authenticationService.logout();
        // }
        // if (this.data.code === 200) {
        //   return this.address = this.data.msg.address;
        // }
        this.address = this.data.msg.address;
        this.depositModal.show(currency, this.address);
      },
      error => {
        this.toastr.warning('Unable to establish connection with the server. Please try again.');
      }
    );
  }

  getWallet(currency: string): void {
    if (sessionStorage.getItem(currency)) {
      this.address = sessionStorage.getItem(currency);
      this.depositModal.show(currency, this.address);
    } else {
      this.address = this.getWalletAddress(currency);
    }
  }

  logout() {
    this.authenticationService.logout();
  }

}

