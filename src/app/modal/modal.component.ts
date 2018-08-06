import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('depositModal') depositModal: ModalDirective;
  currency: string;
  address: string;
  constructor() { }

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
}
