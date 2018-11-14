import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../layouts/loading/loading.service';
import { AuthService } from '../../services/auth.service';
import { KeyeventService } from '../../services/keyevent.service';
import { Router } from '@angular/router';
import { CryptostoreService } from '../../services/cryptostore.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private load: LoaderService,
    private auth: AuthService,
    private keyevent: KeyeventService,
    private router: Router,
    private cryptostore: CryptostoreService
  ) {
    this.signupForm = fb.group({
      signupFormPassword: ['', Validators.required],
      signupFormEmail: ['', [Validators.required, Validators.email]],
      signupFormRefid: ['', []],
      signupFormCPassword: ['', Validators.required]
    });
  }

  ngOnInit() {}

  signup() {
    // console.log(this.signupForm.value);
    if (!this.signupForm.valid) {
      this.toastr.error('Invalid form fields', null, { timeOut: 4000 });
    } else {
      // this.load.show();
      if (!this.keyevent.validateEmail(this.signupForm.value.signupFormEmail)) {
        this.toastr.warning('Invalid email', null, { timeOut: 4000 });
      } else if (
        !this.keyevent.checkPassword(this.signupForm.value.signupFormPassword) ||
        !this.keyevent.checkPassword(this.signupForm.value.signupFormCPassword)
      ) {
        this.toastr.warning(
          'Password must be minimum eight characters, at least one letter and one number and one special character.',
          null,
          { timeOut: 4000 }
        );
      } else if (
        this.signupForm.value.signupFormPassword !== this.signupForm.value.signupFormCPassword
      ) {
        this.toastr.warning('Password not matched', null, { timeOut: 4000 });
      } else {
        const data = {
          email: this.signupForm.value.signupFormEmail,
          password: this.signupForm.value.signupFormPassword,
          ref_id: this.signupForm.value.signupFormRefid
        };
        // console.log(data);
        this.auth.signup(data).subscribe(
          d => {
            // console.log(d);
            this.load.hide();
            if (d.code === 200 && d.msg === 'successfully_added') {
              this.toastr.success('Successfully registered', null, {
                timeOut: 4000
              });
              const email = this.signupForm.value.signupFormEmail;
              this.cryptostore.saveToLocal('AcexUserEmail', email);
              const getEmail = this.cryptostore.getLocalValue('AcexUserEmail');
              // console.log(getEmail, this.cryptostore.retrieveFromLocal('AcexUserEmail'));
              this.router.navigate(['/auth/otp', getEmail]);
            } else {
              this.toastr.error('Not registered successfully', null, {
                timeOut: 4000
              });
            }
          },
          e => {
            // console.log(e.error.code);
            this.load.hide();
            if (e && e.error.code === 500) {
              if (e.error.msg === 'already exists') {
                this.toastr.info('You are already registered', null, {
                  timeOut: 4000
                });
                const email = this.signupForm.value.signupFormEmail;
                this.cryptostore.saveToLocal('AcexUserEmail', email);
                const getEmail = this.cryptostore.getLocalValue('AcexUserEmail');
                this.router.navigate(['/auth/login', getEmail]);
              } else {
                this.toastr.error('Invalid request', null, { timeOut: 4000 });
              }
            } else {
              this.toastr.error('Invalid request', null, { timeOut: 4000 });
            }
          }
        );
      }
    }
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
