import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: any;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

}
