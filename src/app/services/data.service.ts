import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Balance } from '../_models/balance';
import { Rate } from '../_models/rate';

@Injectable()
export class DataService {

  private balanceSource = new BehaviorSubject<Balance>(null);
  private rateSource = new BehaviorSubject<Rate>(null);
  currentBalance = this.balanceSource.asObservable();
  currentRate = this.rateSource.asObservable();

  constructor() { }

  newBalance(balance: Balance) {
    this.balanceSource.next(balance);
  }

  newRate(rate: Rate) {
    this.rateSource.next(rate);
  }

}
