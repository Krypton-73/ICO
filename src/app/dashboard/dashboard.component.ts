import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { LoaderService } from '../layouts/loading/loading.service';

import { BuyTokensComponent } from '../buy-tokens/buy-tokens.component';
import  BigNumber  from 'bignumber.js';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  balance: any;

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.currentBalance.subscribe(balance => { this.balance = balance });
  }

  @ViewChild('buyAcex') buyAcex: BuyTokensComponent;
    
  buyAcexTokens() {
    this.buyAcex.show();
  }

  recievedMessage($event) {
    console.log($event);
  }
}
