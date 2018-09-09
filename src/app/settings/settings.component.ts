import { Component, OnInit } from '@angular/core';
import { UserKyc } from '../_models/user-kyc';
import { UserProfile } from '../_models/user-profile';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authenticationService';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userKyc: UserKyc;
  userProfile: UserProfile;
  base64String = [];
  data: any;
  error: any;
  files = [];
  userKycDocImgs = [];
  image: any;
  

  constructor(
    private userService: UserService,
    public toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.userService.getProfile().pipe().subscribe(
      data => {
        this.data = data;
        this.userProfile = this.data.msg.profile;
        this.userKyc = this.data.msg.kyc;
        console.log(this.userKyc);
        // this.userKycDocImgs.push(this.dataURItoBlob(JSON.stringify(this.userKyc.kyc_doc)));
        // console.log(this.userKycDocImgs);
        this.userKycDocImgs.push(this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + this.userKyc.kyc_doc));

        this.image = this.domSanitizer.bypassSecurityTrustUrl(this.userKyc.kyc_doc);
        console.log(this.image);
      },
      error => {
        console.log(error);
        this.error = error.error
        if (this.error.code === 401) {
          return this.logout();
        }
        this.toastr.error('Error connecting to server.');
      }
    )
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }


  uploadKycDoc(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64String.push(btoa(binaryString));
    console.log(btoa(binaryString));
  }

  verifyKyc() {
    this.userService.userKYC(this.base64String[0], this.base64String[1]).pipe().subscribe(
      data => {
        this.data = data;
        console.log(data);
      },
      error => {
        this.error = error.error;
        if (this.error.code === 401) {
          return this.logout();
        }
        console.log(error);
      }
    )
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
