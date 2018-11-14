import { Component, OnInit } from '@angular/core';
import { CryptostoreService } from '../services/cryptostore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(public crypt: CryptostoreService, public router: Router) {}

  ngOnInit() {
    this.crypt.InitKeySet();
  }

  authto(type) {
    switch (type) {
      case 'login':
        this.router.navigate(['/auth/login']);
        break;
      case 'sign':
        this.router.navigate(['/auth/signup']);
        break;
    }
  }
}
