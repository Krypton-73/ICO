import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private balanceSource = new BehaviorSubject('');
  currentBalance = this.balanceSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.balanceSource.next(message)
  }

}
