import { Component, ViewChild, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { LoaderService } from '../layouts/loading/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'angular-bootstrap-md';
import { DataService } from '../services/data.service';
import { Balance } from '../_models/balance';
import { Rate } from '../_models/rate';


@Component({
    selector: 'app-buy-tokens',
    templateUrl: './buy-tokens.component.html',
    styleUrls: ['./buy-tokens.component.scss']
})
export class BuyTokensComponent implements OnInit, OnDestroy {
    buyForm: FormGroup;
    currentJustify = "fill";
    data: any;
    error: any;
    balance: Balance;
    rate: Rate;
    balanceUsd: any;
    requiredBal: any;
    maxAcexTokens: number;
    amountOfCurrencyReq: number;
    currency: string;

    @ViewChild('buyAcex') buyAcex: ModalDirective;

    @Output() successEvent = new EventEmitter<boolean>();

    constructor(public modalService: NgbModal,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private load: LoaderService,
        private toastr: ToastrService,
        public dataService: DataService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.buyForm = this.formBuilder.group({
            currency: ['', Validators.required],
            amountOfAcex: [100, [Validators.required, Validators.min(100), Validators.pattern]]
        });

        this.dataService.currentBalance.subscribe(balance => { this.balance = balance });
        this.dataService.currentRate.subscribe(
            rate => {
                this.rate = rate;
                if (this.rate) {    
                    this.amountOfCurrencyReq = (100 * 0.1) / this.rate.btc;
                    console.log(this.amountOfCurrencyReq);  
                }
            },
            error => {
            console.log(error);
        });
    }

    ngOnDestroy() {
        // this.buyForm.reset();
    }

    get f() { return this.buyForm.controls };

    show() {
        this.buyAcex.show();
    }

    hide() {
        this.buyAcex.hide();
    }

    checkBalance(currency: string) {
        this.currency = currency;
        switch (this.currency) {
            case 'btc':
                this.balanceUsd = this.balance.btc * this.rate.btc;
                this.amountOfCurrencyReq = (100 * 0.1) / this.rate.btc;
                break;
            case 'eth':
                this.balanceUsd = this.balance.eth * this.rate.eth;
                this.amountOfCurrencyReq = (100 * 0.1) / this.rate.eth;
                break;
            case 'ltc':
                this.balanceUsd = this.balance.ltc * this.rate.ltc;
                this.amountOfCurrencyReq = (100 * 0.1) / this.rate.ltc;
                break;
        }
        this.maxAcexTokens = Math.floor(this.balanceUsd / 0.1);
        console.log(this.balanceUsd, this.maxAcexTokens);
    }

    amountOfCurrency(amount: number) {
        var valueUsd = amount * 0.1;
        switch (this.currency) {
            case 'btc':
                var rate = this.rate.btc;
                break;
            case 'eth':
                var rate = this.rate.eth;
                break;
            case 'ltc':
                var rate = this.rate.ltc;
                break;
        }
        this.amountOfCurrencyReq = valueUsd / rate;
        console.log(this.amountOfCurrencyReq);
    }

    buyAcexTokens() {
        console.log(this.f.currency.value, this.f.amountOfAcex.value);
        if (this.buyForm.invalid) {
            return;
        }
        let bool: boolean = this.balanceCheck(this.f.amountOfAcex.value);
        if (bool == false) {
            this.toastr.info('Insufficient Funds')
        }
        if (bool == true) {
            this.userService.buyAcex(this.f.currency.value, this.f.amountOfAcex.value)
                .pipe().subscribe(
                    data => {
                        this.data = data;
                        if (this.data.code === 200) {
                            this.toastr.success('Tokens Purchased!');
                        }
                        this.buyAcex.hide();
                        this.successEvent.emit(true);
                    },
                    error => {
                        this.error = error.error;
                        if (this.error.code === 401) {
                            this.toastr.info('Unable to connect to server. Please retry login.');
                            return this.logout();
                        }
                        this.toastr.error('Error');
                    }
                );
        }
        // this.load.hide();
    }

    balanceCheck(amountOfAcex) {
        this.requiredBal = amountOfAcex * 0.1;

        if (this.requiredBal <= this.balanceUsd) {
            return true;
        }

        return false;

    }


    logout() {
        this.authenticationService.logout().pipe().subscribe(
            data => {
                window.sessionStorage.clear();
                this.router.navigate(['/auth']);
            },
            error => {
                window.sessionStorage.clear();
                this.router.navigate(['/auth']);
            }
        )
    }

}
