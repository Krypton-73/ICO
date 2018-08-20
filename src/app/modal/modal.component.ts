import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('depositModal') depositModal: ModalDirective;
  @ViewChild('withdrawModal') withdrawModal: ModalDirective;
  currency: string;
  address: string;
  destAddress: string;
  amount: string;
  QRaddress:string = '';
  currencyType: any = {
    'btc': 'BTC',
    'eth': 'ETH',
    'ltc': 'LTC',
    'acex': 'ACEX'
  }

  constructor(
    public toastr: ToastrService
  ) { 
  }

  ngOnInit() {
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

  showWithdraw(currecy: string) {
    this.currency = currecy;
    this.withdrawModal.show();
  }

  hideWithdraw() {
    this.withdrawModal.hide();
  }

  depositClip() {
    this.toastr.info('Copied to Clipboard');
  }
}
