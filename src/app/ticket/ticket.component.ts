import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticketForm: FormGroup;
  data: any;
  tickets = [];
  statusType = {
    1: 'Submitted',
    2: 'Pending',
    3: 'Closed'
  };

  @ViewChild('ticketModal') ticketModal: TicketModalComponent;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.ticketForm = this.formBuilder.group({
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    this.userService.getTickets().pipe().subscribe(
      data => {
        this.data = data;
        let i: any;
        for (i = 0; i < this.data.msg.length; i++) {
          this.tickets.push(this.data.msg[i]);
        }
        console.log(this.tickets);
      },
      error => {
        this.data = error.error;
        console.log(this.data);
      }
    );
  }

  get f() { return this.ticketForm.controls; }

  viewTicket(ticketNo: string) {
    const ticket = this.tickets.filter(c => c.ticket_no === ticketNo);
    this.userService.getTicket(ticketNo).pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code === 200) {
          this.ticketModal.show(ticket[0], this.data.msg[0].msgs[0]);
        }
      },
      error => {
        this.data = error.error;
      }
    );
  }


  submit() {
    if (this.ticketForm.invalid) { return this.toastr.warning('Invalid Input'); }

    this.userService.submitTicket(this.f.subject.value, this.f.message.value).pipe().subscribe(
      data => {
        this.data = data;
        this.toastr.success('Submitted');
      },
      error => {
        this.data = error.error;
        console.log(this.data);
        this.toastr.warning('Some error occurred');
      }
    );

  }

}
