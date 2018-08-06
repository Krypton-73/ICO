import {Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { LoaderService } from '../layouts/loading/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.scss']
})
export class BuyTokensComponent implements OnInit{
  closeResult: string;
  currency: string;
  amountOfAcex: string;
  data: any;

  @Output() successEvent = new EventEmitter<boolean>();

  constructor(public modalService: NgbModal,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private load: LoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit () {
  }


  @ViewChild('buyAcex') buyAcex: ModalDirective;

  show() {
    this.buyAcex.show();
  }

  hide() {
    this.buyAcex.hide();
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  buyAcexTokens() {

    // if(this.buyTokenForm.invalid) { return; }

    // Update balance check
    if(this.currency && this.amountOfAcex) {
    this.load.show();
    this.userService.buyAcex(this.currency, this.amountOfAcex)
    .pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===200) {
          this.toastr.success('Tokens Purchased!');
        }
        this.buyAcex.hide();
        this.successEvent.emit(true);
      },
      error => {
        if (error.code===401) {
          this.authenticationService.logout();
          this.toastr.info('Unable to connect to server. Please retry login.');
        }
        this.toastr.error('Insufficient Funds');
      }
    );
    this.load.hide();
  }
}

  

}
