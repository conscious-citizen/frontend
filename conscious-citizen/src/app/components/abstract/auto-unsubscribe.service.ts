import {Component, Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export abstract class AutoUnsubscribe implements OnDestroy{
    private isSubscribe: Subject<boolean> = new Subject();

    ngOnDestroy(): void {
        this.isSubscribe.next(false);
        this.isSubscribe.complete();
    }

}
