import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authenticationService';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../_models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: User;
  base64String = [];
  data: any;
  error: any;
  userKycDocImgs = [];
  image: any;
  submitButton: boolean;


  constructor(
    private userService: UserService,
    public toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    if (sessionStorage.getItem('userProfile')) {
      this.user = JSON.parse(sessionStorage.getItem('userProfile'));
      this.userKycDocImgs.push(this.user.kyc.kyc_doc);
      this.userKycDocImgs.push(this.user.kyc.kyc_selfie);
    } else {
      this.userService.getProfile().pipe().subscribe(
        data => {
          this.data = data;
          this.user = this.data.msg;
          if (this.user.kyc.kyc_status !== -1) {
            this.submitButton = false;
            sessionStorage.setItem('userProfile', JSON.stringify(this.data.msg));
          }
          this.userKycDocImgs.push(this.user.kyc.kyc_doc);
          this.userKycDocImgs.push(this.user.kyc.kyc_selfie);
        },
        error => {
          console.log(error);
          this.error = error.error;
          if (this.error.code === 401) {
            return this.logout();
          }
          this.toastr.error('Error connecting to server.');
        }
      );
    }
  }

  uploadKycDoc(event) {
    const files = event.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    console.log(readerEvt.target.result);
    this.base64String.push(binaryString);
    console.log(btoa(binaryString));
  }

  verifyKyc() {
    this.userService.userKYC(this.base64String[0], this.base64String[1]).pipe().subscribe(
      data => {
        this.data = data;
        console.log(data);
        if (this.data.msg.kyc.kyc_status !== -1 ) {
          this.toastr.warning('Already Uploaded');
          return;
        }
        this.toastr.success('Uploaded Successfully');
        window.location.reload();
        this.router.navigate(['/settings']);
      },
      error => {
        this.error = error.error;
        if (this.error.code === 401) {
          return this.logout();
        }
        console.log(error);
        this.toastr.warning('Already Uploaded');
      }
    );
  }

  logout() {
    this.authenticationService.logout().pipe().subscribe(
      data => {
        window.sessionStorage.clear();
        this.router.navigate(['/auth']);
      },
      error => {
        window.sessionStorage.clear();
        this.router.navigate(['/auth']);
      }
    );
  }
}
