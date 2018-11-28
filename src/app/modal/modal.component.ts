import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  address: string;
  to_address: string;
  amount: number;
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
    private router: Router
    ) {}

  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
      amount: ['', Validators.required],
      to_address: ['', Validators.required]
    });
  }

  get f() {
    return this.withdrawForm.controls;
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
      this.toastr.error('Invalid form fields');
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
        this.error = error.error;
        if (this.error.code === 500) {
          this.toastr.info(error);
          // return this.logout();
        }else
        {
          this.toastr.error('Error');
        }
      }
    );
    // this.withdrawModal.hide();
    }
  }

  depositClip() {
    this.toastr.info('Copied to Clipboard');
  }
}
