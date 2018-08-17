import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authenticationService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginauth',
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.scss']
})
export class LoginauthComponent implements OnInit {

  currentJustify = 'fill';
  tab = 'login'
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted: any = false;
  verified: boolean;
  email: string;
  refId: string;
  data: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.refId = this.route.snapshot.paramMap.get('refId');
    if (this.refId) {
      this.tab = 'register';
    }

    this.loginForm = this.formBuilder.group( {
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group( {
      name: ['', [Validators.required, Validators.pattern]],
      mobile:  ['', [Validators.required, Validators.pattern]],
      password: ['', [Validators.required, Validators.pattern, Validators.minLength(8)]],
      refId:  [this.refId, Validators.minLength(7)],
      email:  ['', [Validators.required, Validators.email]],
      cPassword:  ['', Validators.required],
      agree: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }
  get t() { return this.registerForm.controls; }

  auth(type) {
    this.submitted = true;

    if(type === 'signin') {
      if(this.loginForm.invalid) { return; }

    this.authenticationService.login(this.f.email.value, this.f.password.value).pipe().subscribe(
      data => {
        this.data = data;
        if(this.data.code===200 && this.data.msg==='success') {
          this.toastr.success('Validate OTP sent to your Registered Email');
          this.router.navigate(['/auth/validate-otp'], { queryParams: { email: this.f.email.value } });
        }
      },
      error => {
        this.data = error;
        if(this.data.error.code===500 && this.data.error.msg==="user not verified"){
          this.verified = true;
          return this.toastr.warning('Please confirm verfication link sent to your registered email')
        } else {
        this.toastr.warning('Invalid Password');
        }
      }
    );
  }

  if (type === 'signup') {
    if (this.registerForm.invalid) { return; }
    if (this.t.password.value !== this.t.cPassword.value ) {
      return this.toastr.warning('Password and Confirm Password does not match');
    }
    this.authenticationService.register(this.registerForm.value).pipe().subscribe(
      data => {
        this.data = data;
        if(this.data.code===200 && this.data.msg==='successfully_added') {
          this.toastr.success('A verification link has been sent to your registered Email.');   
          // email input in sign-in on successful registeration. 
          this.router.navigate(['/auth/signin', this.t.email.value]);  
        }
      },
      error => {
        this.data = error;
        console.log(this.data.error.code);
        if(this.data.error.code===500 && this.data.error.msg==='already exists'){
          return this.toastr.error('User email already Registered');
         }
        if(this.data.error.code===500 && this.data.error.msg==='invalid mobile'){
          return this.toastr.error('Mobile No must be a number');
        }
        this.toastr.error('error', null, { timeOut: 4000 });
      }
    );
  }
    // 'signup', 'signin'
    
  }

  resendVerifyEmail() {
    this.authenticationService.resendVerifyEmail(this.f.email.value).pipe()
    .subscribe(
      data => {
        this.data = data;
        if(this.data.code===200 && this.data.msg==='confirmation mail resent') {
          return this.toastr.info('Verification link has been sent to your email.');
        }
      },
      error => {
        return this.toastr.error('Error connecting to server');
      }
    )
  }

}
