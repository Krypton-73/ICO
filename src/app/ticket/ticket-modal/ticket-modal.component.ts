import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss']
})
export class TicketModalComponent implements OnInit {
  @ViewChild('ticketModal') ticketModal: ModalDirective;

  constructor() {}

  ticket: any;
  messages: any = [];
  userName: string;

  statusType = {
    1: 'Submitted',
    2: 'Pending',
    3: 'Closed'
  };

  subjectReform: any = {
    crypto_deposit: 'Crypto Deposit',
    account_frozen: 'Account being Monitored',
    crypto_withdrawal: 'Crypto Withdrawal',
    bank_details_change: 'Bank Details Change',
    kyc: 'KYC',
    email_change: 'Email Change',
    mobile_number_change: 'Mobile Number Change',
    recovery_password: 'Recovery Password',
    suggestions: 'Suggestions',
    others: 'Others'
  };

  ngOnInit() {}

  show(ticket: any, body: string) {
    // console.log(ticket, body);
    this.ticket = ticket;
    this.messages = body;
    console.log(this.ticket, this.messages);
    this.ticketModal.show();
  }

  hide() {
    this.ticketModal.hide();
  }
}
