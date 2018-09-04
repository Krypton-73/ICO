import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: any;
  kycForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.kycForm = this.formBuilder.group({
      doc1: [''],
      doc2: ['']
    });
   }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  onSubmit() {
    
  }

}
