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

  constructor() { }

  ticket: any;
  body: any;

  ngOnInit() {
  }

  show(ticket: any, body: string ) {
    // console.log(ticket, body);
    this.ticket = ticket;
    this.body = body;
    console.log(this.ticket.user_id, this.body.body);
    this.ticketModal.show();
  }

  hide() {
    this.ticketModal.hide();
  }

}
