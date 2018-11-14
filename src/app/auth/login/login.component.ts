import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../layouts/loading/loading.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyeventService } from '../../services/keyevent.service';
import { CryptostoreService } from '../../services/cryptostore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private load: LoaderService,
    private auth: AuthService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private keyevent: KeyeventService,
    private cryptostore: CryptostoreService
  ) {
    this.loginForm = fb.group({
      loginFormPassword: ['', Validators.required],
      loginFormEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    const email = this.activeroute.snapshot.paramMap.get('email');
    if (email) {
      // this.keyevent.validateEmail(email)
      const getEmail = this.cryptostore.getLocalValue('AcexUserEmail');
      const cryptEmail = this.cryptostore.getCryptValue(email);
      if (getEmail === email && this.keyevent.validateEmail(cryptEmail)) {
        this.loginForm.get('loginFormEmail').setValue(cryptEmail);
      }
    }
  }

  login() {
    // console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      this.toastr.error('Invalid form fields', null, { timeOut: 4000 });
    } else {
      this.load.show();
      const data = {
        email: this.loginForm.value.loginFormEmail,
        password: this.loginForm.value.loginFormPassword
      };
      this.auth.login(data).subscribe(
        d => {
          console.log(d);
          this.load.hide();
          if (d.code === 200 && d.msg === 'successfully_added') {
            this.toastr.success('Successfully registered', null, {
              timeOut: 4000
            });
            const email = this.loginForm.value.loginFormEmail;
            this.cryptostore.saveToLocal('AcexUserEmail', email);
            this.router.navigate(['/home']);
          } else {
            this.toastr.error('Invalid email and password', null, {
              timeOut: 4000
            });
          }
        },
        e => {
          // console.log(e);
          this.load.hide();
          if (e && e.error.code === 500) {
            if (e.error.msg === 'no such user found') {
              this.toastr.info('You are not registered user', null, {
                timeOut: 4000
              });
              const email = this.loginForm.value.loginFormEmail;
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
