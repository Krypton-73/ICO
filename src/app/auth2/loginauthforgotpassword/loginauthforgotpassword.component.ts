import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginauthforgotpassword',
  templateUrl: './loginauthforgotpassword.component.html',
  styleUrls: ['./loginauthforgotpassword.component.scss']
})
export class LoginauthforgotpasswordComponent implements OnInit {

  currentJustify: any = 'center';

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  auth(type) {
    this.router.navigate(['/dashboard']);
  }
}
