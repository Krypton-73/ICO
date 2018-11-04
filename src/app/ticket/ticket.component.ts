import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';
import { AuthenticationService } from '../services/authenticationService';

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
  subjectReform: any = {
    "crypto_deposit": "Crypto Deposit",
    "account_frozen": "Account being Monitored",
    "crypto_withdrawal": "Crypto Withdrawal",
    "bank_details_change": "Bank Details Change",
    "kyc": "KYC",
    "email_change": "Email Change",
    "mobile_number_change": "Mobile Number Change",
    "recovery_password": "Recovery Password",
    "suggestions": "Suggestions",
    "others": "Others"
  }

  @ViewChild('ticketModal') ticketModal: TicketModalComponent;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.ticketForm = this.formBuilder.group({
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    this.getTickets();
  }

  getTickets() {
    this.userService.getTickets().pipe().subscribe(
      data => {
        this.data = data;
        this.tickets = [];
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
          this.ticketModal.show(ticket[0], this.data.msg[0].msgs);
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
        if (this.data.code === 200) {
          this.getTickets();
          this.ticketForm.reset();
          this.toastr.success('Submitted');
        }
      },
      error => {
        this.data = error.error;
        console.log(this.data);
        if (this.data.code === 401) {
          return this.logout();
        }
        this.toastr.warning('Some error occurred');
      }
    );

  }

  logout() {
    this.authenticationService.logout().pipe().subscribe(
      data => {
        this.data = data;
        window.sessionStorage.clear();
        this.router.navigate(['/auth']);
      },
      error => {
        this.data = error.error;
        window.sessionStorage.clear();
        this.router.navigate(['/auth']);
      }
    );
  }

}