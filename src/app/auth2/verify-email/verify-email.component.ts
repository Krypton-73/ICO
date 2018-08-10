import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authenticationService';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  email: any;
  verCode: any;
  data: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.verCode = this.route.snapshot.paramMap.get('verCode');

    this.authenticationService.verifyEmail(this.email, this.verCode)
    .pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===200 && this.data.msg==='verified') {
          this.toastr.success('Successfully Verified');
          this.router.navigate(['/auth/signin', this.email]);
        } else {
          this.toastr.error('Invalid Inputs');
        }
      },
      error => {
        this.toastr.warning('Error connecting to Server');
      }
    );
  }

}
