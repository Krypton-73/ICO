import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authenticationService';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email: string;
  verCode: any;
  password: string;
  cpassword: string;
  data: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.verCode = this.route.snapshot.paramMap.get('verCode');
  }

  reset() {
    if (this.password !== this.cpassword) {
      return this.toastr.warning('Password and Confirm Password does not match');
    }
    this.authenticationService
      .resetPassword(this.email, this.password, this.verCode)
      .pipe()
      .subscribe(
        data => {
          this.data = data;
          if (this.data.code === 200 && this.data.msg === 'password reset successfully') {
            this.toastr.success('Password has been successfully reset.');
            this.router.navigate(['/auth']);
          } else {
            this.toastr.warning('Invalid Email');
          }
        },
        error => {
          this.toastr.info('Error connecting to server');
        }
      );
  }
}
