import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserCredentialsService} from "../../../services/user-credentials.service";
import {KEYS, PROFILE_MENU_ITEMS} from "../../../models/constants";
import {BehaviorSubject, filter, map, Subject, take, takeUntil} from "rxjs";
import {NbMenuService} from "@nebular/theme";

@Component({
    selector: 'app-top-panel',
    templateUrl: './top-panel.component.html',
})
export class TopPanelComponent implements OnInit, OnDestroy {

    public firstName: string | null = null
    public lastName: string | null = null
    public items = [{title: PROFILE_MENU_ITEMS.PROFILE}, {title: PROFILE_MENU_ITEMS.LOGOUT}];
    private subscribe: Subject<void> = new Subject<void>();

    constructor(private nbMenuService: NbMenuService,
                private router: Router,
                public userCredentialsService: UserCredentialsService) {
    }

    ngOnInit(): void {
        this.nbMenuService.onItemClick()
            .pipe(
                filter(({ tag }) => tag === 'profile-context-menu'),
                map(({ item: { title } }) => title),
                takeUntil(this.subscribe),
            )
            .subscribe(title => title === PROFILE_MENU_ITEMS.PROFILE ? this.navigateToProfile() : this.signOut());
    }

    navigateToProfile(): void {
        this.router.navigate(['/profile']);
    }

    signOut(): void {
        this.userCredentialsService.signOut();
        this.router.navigate(['']);
    }


    navigateToMainOrMap() {
        if (this.userCredentialsService.getToken() === null) {
            this.router.navigate(['/'])
        } else this.router.navigate(['/map'])
    }

    checkUserName() {
        this.firstName = this.userCredentialsService.getFirstName();
        this.lastName = this.userCredentialsService.getLastName();
        return !(!this.firstName && !this.lastName);
    }

    concatName() {
        return this.firstName + ' ' + this.lastName
    }

    ngOnDestroy(): void {
        this.subscribe.next();
        this.subscribe.complete();
    }
}
