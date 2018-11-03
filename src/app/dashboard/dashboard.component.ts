import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { LoaderService } from '../layouts/loading/loading.service';

import { BuyTokensComponent } from '../buy-tokens/buy-tokens.component';
import BigNumber from 'bignumber.js';
import { Balance } from '../_models/balance';
import { DataService } from '../services/data.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

    data: any;
    balance: Balance;

    @ViewChild('buyAcex') buyAcex: BuyTokensComponent;

    constructor (
        public dataService: DataService
    ) {
    }

    ngOnInit () {
        this.dataService.currentBalance.subscribe(balance => {
            this.balance = balance;
        });
    }


    prefixNosByFix (no: any) {
        try {
            if (no !== 0) {
                return Number.parseFloat(no).toFixed(8);
            } else {
                return 0;
            }
        } catch (e) {
            return 0;
        }
    }

    calcsubstr (amnt: any) {
        let retrieve = 0;
        try {
            // console.log("**********************************\n","base",amnt);
            if (amnt === 0) {
                retrieve = 0;
            } else {
                // console.log("florr",l2)
                const l = Math.floor(amnt);
                // console.log("flrr<-",l);
                const l2 = amnt - l;
                const l1 = l2.toString().substr(0, 8);
                // console.log("substr->",l1)
                const l4 = parseFloat(l1);
                // let l33:number = l4;
                const l3 = l + l4;
                // console.log("retr",l3)
                retrieve = l3;
            }
            return retrieve;
        } catch (e) {
            return retrieve;
        }
    }

    buyAcexTokens () {
        this.buyAcex.show();
    }

    recievedMessage ($event) {
        console.log($event);
    }
}
