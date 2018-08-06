import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loading.interface';
@Injectable()
export class LoaderService {
    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    constructor() {}
    show() {
        // console.log('i called');
        this.loaderSubject.next(<LoaderState>{ show: true });
    }
    hide() {
        // console.log('i called');
        this.loaderSubject.next(<LoaderState>{ show: false });
    }
}
