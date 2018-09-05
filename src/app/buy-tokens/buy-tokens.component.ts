import {Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
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
export class BuyTokensComponent implements OnInit {
    buyForm: FormGroup;
    currentJustify = "fill";
    data: any;
    error: any;
    balance: Balance;
    rate: Rate;
    acexBal: any;
    balanceUsd: any;
    requiredBal: any;

    @Output() successEvent = new EventEmitter<boolean>();

    constructor(public modalService: NgbModal,
                private userService: UserService,
                private authenticationService: AuthenticationService,
                private load: LoaderService,
                private toastr: ToastrService,
                public dataService: DataService,
                private router: Router,
                private formBuilder: FormBuilder
    ) {}

    ngOnInit () {
        this.buyForm = this.formBuilder.group({
            currency: ['btc', Validators.required],
            amountOfAcex: ['', [Validators.required, Validators.min(0), Validators.pattern]]
        });

        this.dataService.currentBalance.subscribe(balance => { this.balance = balance });
        this.dataService.currentRate.subscribe(rate => { this.rate = rate });
    }

    get f () { return this.buyForm.controls };

    @ViewChild('buyAcex') buyAcex: ModalDirective;

    show() {
        this.buyAcex.show();
    }

    hide() {
        this.buyAcex.hide();
    }

    amtOfAcex(tokens: number) {
        if(this.f.amountOfAcex.errors){
            return;
        }
    }

    balanceCheck(currency, amountOfAcex) {
        switch (currency) {
            case 'btc':
                this.balanceUsd = this.balance.btc * this.rate.btc;
                break;
            case 'eth':
                this.balanceUsd = this.balance.eth * this.rate.eth;
                break;
            case 'ltc':
                this.balanceUsd = this.balance.ltc * this.rate.ltc;
                break;
        }
        this.requiredBal = amountOfAcex * 0.1;

        if(this.requiredBal <= this.balanceUsd) {
            return true;
        }

        return false;

    }

    buyAcexTokens() {
        console.log('Hello');
        if (this.buyForm.invalid) {
            return;
        }
        const bool: boolean = this.balanceCheck(this.f.currency, this.f.amountOfAcex);
        if(bool == false) {
            return this.toastr.warning('Insufficient funds');
        }
        if(bool == true) {
            this.userService.buyAcex(this.f.currency, this.f.amountOfAcex)
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
                    this.error = error.error;
                    if (this.error.code===401) {
                        this.toastr.info('Unable to connect to server. Please retry login.');
                        return this.logout();
                    }
                    this.toastr.error('Error');
                }
            );
        }
        // this.load.hide();
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
