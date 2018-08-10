import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { AuthenticationService } from '../../services/authenticationService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginauthforgotpassword',
  templateUrl: './loginauthforgotpassword.component.html',
  styleUrls: ['./loginauthforgotpassword.component.scss']
})
export class LoginauthforgotpasswordComponent implements OnInit {

  currentJustify: any = 'center';
  data: any;
  email: string;

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  reset() {
    this.authenticationService.requestPassword(this.email).subscribe(
      data => {
        this.data = data;
        if(this.data.code===200 && this.data.msg==="reset mail sent") {
          this.toastr.info('An e-mail to reset password has been sent to your email address');
        }
      },
      error => {
        this.toastr.error('Invalid Email');
      }
    )
  }
}
