import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../layouts/loading/loading.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyeventService } from '../../services/keyevent.service';
import { CryptostoreService } from '../../services/cryptostore.service';

@Component({
  selector: 'app-registeredmessage',
  templateUrl: './registeredmessage.component.html',
  styleUrls: ['./registeredmessage.component.scss']
})
export class RegisteredmessageComponent implements OnInit {

  message: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private load: LoaderService,
    private auth: AuthService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private keyevent: KeyeventService,
    private cryptostore: CryptostoreService
  ) { }

  ngOnInit() {
    const email = this.activeroute.snapshot.paramMap.get('token');
    if (email) {
      const getEmail = this.cryptostore.getLocalValue('AcexUserEmail');
      const cryptEmail = this.cryptostore.getCryptValue(email);
      if (getEmail === email && this.keyevent.validateEmail(cryptEmail)) {
        this.message = 'Verification Link has been sent to your email ID ' + cryptEmail;
        // console.log(cryptEmail);
      }
    }
  }

}
