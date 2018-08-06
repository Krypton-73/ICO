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

  currentJustify: any = 'fill';
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted: any = false;
  // loading: any = false;
  data: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const email = this.route.snapshot.paramMap.get('email');

    this.loginForm = this.formBuilder.group( {
      email: [email, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group( {
      fName: [''],
      mNo:  [''],
      password: ['', Validators.required],
      lName:  [''],
      email:  ['', [Validators.required, Validators.email]],
      cPassword:  ['']
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
        if(this.data.code===200) {
          this.toastr.success('Validate OTP sent to your Registered Email');
          this.router.navigate(['/auth/validate-otp'], { queryParams: { email: this.f.email.value } });
        }
      },
      error => {
          this.toastr.warning('Invalid Password. If new user, check your registered email for verfication link');
      }
    );
  }

  if (type === 'signup') {
    if (this.registerForm.invalid) { return; }
    this.authenticationService.register(this.t.email.value, this.t.password.value, '').pipe().subscribe(
      data => {
        this.data = data;
        if(this.data.code===200) {
          this.toastr.success('A verification link has been sent to your registered Email.');   
          // email input in sign-in on successful registeration. 
          this.router.navigate(['/auth/signin', this.t.email.value]);  
        }
      },
      error => {
        this.toastr.error('User already Exists or Invalid Email', null, { timeOut: 4000 });
      }
    );
  }
    // 'signup', 'signin'
    
  }

}
