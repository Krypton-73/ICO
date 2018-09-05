import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userKyc: User;
  user: any;
  base64String1: any;
  base64String2: any;
  data: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  addUserInformation1(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  addUserInformation2(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded2.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded1(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64String1 = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  _handleReaderLoaded2(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64String2 = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  verifyKyc() {
    this.userService.userKYC(this.base64String1, this.base64String2).pipe().subscribe(
      data => {
        this.data = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
