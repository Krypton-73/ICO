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
  data:any;

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
    // // const email = this.activeroute.snapshot.paramMap.get('token');
    // if (this.userEmail) {
    //   const getEmail = this.cryptostore.getLocalValue('AcexUserEmail');
    //   const cryptEmail = this.cryptostore.getCryptValue(this.userEmail);
    //   if (getEmail === this.userEmail && this.keyevent.validateEmail(cryptEmail)) {
    //     this.otpForm.get('otpFormEmail').setValue(cryptEmail);
    //     // console.log(cryptEmail);
    //   }
    // }
  }

  otp() {
    // console.log(this.otpForm.value);
    if (!this.otpForm.valid) {
      this.toastr.error('Invalid OTP', null, { timeOut: 4000 });
    } else {
      this.load.show();
      this.authenticationService.verifyOtp(this.userEmail, this.otpForm.controls.otp.value)
      .subscribe(
        data => {
          this.data = data;
          this.load.hide();
          if (this.data.code === 200 && this.data.msg.jwt) {
            this.toastr.success('Welcome to AceX!', null, { timeOut: 4000 });
            const getEmail = this.cryptostore.getLocalValue('AcexUserEmail');
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.warning('Invalid OTP', null, { timeOut: 4000 });
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

  // resend() {
  //   this.load.show();
  //   const data = this.cryptostore.retrieveFromLocal('AcexUserEmail');
  //   this.auth.resend(data)
  //   .subscribe(
  //     d => {
  //       // console.log(d);
  //       this.load.hide();
  //       if (d.code === 200) {
  //         this.toastr.success('Link sent successfully', null, { timeOut: 4000 });
  //         const getEmail = this.cryptostore.getLocalValue('AcexUserEmail');
  //           this.router.navigate(['/auth/sent', getEmail]);
  //       } else {
  //         this.toastr.error('Unable to send request', null, { timeOut: 4000 });
  //       }
  //     },
  //     e => {
  //       // console.log(e);
  //       this.load.hide();
  //       this.toastr.error('Invalid request', null, { timeOut: 4000 });
  //     }
  //   );
  // }

}
