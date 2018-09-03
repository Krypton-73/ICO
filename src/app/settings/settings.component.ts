import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: User;
  individualForm: boolean;
  companyForm: boolean;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }


    addUserInformation() {
    }
}
