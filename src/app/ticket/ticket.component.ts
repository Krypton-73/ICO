import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticketForm: FormGroup;
  data: any;

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
  }

  get f() { return this.ticketForm.controls; }

  submit() {
    if (this.ticketForm.invalid) { return this.toastr.warning('Invalid Input'); }

    this.userService.submitTicket(this.f.subject.value, this.f.message.value).pipe().subscribe(
      data => {
        this.data = data;
        console.log(data);
      },
      error => {
        this.data = error.error;
        console.log(this.data);
      }
    );

  }

}
