import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../layouts/loading/loading.service';
import { AuthenticationService } from '../../services/authenticationService';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyeventService } from '../../services/keyevent.service';
import { CryptostoreService } from '../../services/cryptostore.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.scss']
})
export class VerifyotpComponent implements OnInit {
  otpForm: FormGroup;
  userEmail: any;
  data: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private load: LoaderService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private keyevent: KeyeventService,
    private cryptostore: CryptostoreService
  ) {
    this.otpForm = fb.group({
      otp: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params.email;
    });
  }

  otp() {
    // console.log(this.otpForm.value);
    if (!this.otpForm.valid) {
      this.toastr.error('Invalid OTP', null, { timeOut: 4000 });
    } else {
      this.load.show();
      this.authenticationService
        .verifyOtp(this.userEmail, this.otpForm.controls.otp.value)
        .subscribe(
          data => {
            this.data = data;
            this.load.hide();
            if (this.data.code === 200 && this.data.msg.jwt) {
              this.toastr.success('Welcome to AceX!', null, { timeOut: 4000 });
              this.router.navigate(['/dashboard']);
            }
          },
          e => {
            // console.log(e);
            this.load.hide();
            this.toastr.error('Invalid OTP', null, { timeOut: 4000 });
          }
        );
    }
  }

  resendOtp() {}
}
