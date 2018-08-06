import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loading.service';
import { LoaderState } from './loading.interface';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit, OnDestroy {
    show = false;
    private subscription: Subscription;

    constructor(private loaderService: LoaderService) {}

    ngOnInit() {
        this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
            // console.log('>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<');
            this.show = state.show;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>des<<<<<<<<<<<<<<<<<<<<<<');
    }
}
