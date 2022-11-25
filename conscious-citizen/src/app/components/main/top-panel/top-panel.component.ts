import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../../services/token.service";
import {KEYS} from "../../../models/constants";

@Component({
    selector: 'app-top-panel',
    templateUrl: './top-panel.component.html',
})
export class TopPanelComponent implements OnInit {

    public firstName = ''
    public lastName = ''

    constructor(private router: Router, public tokenService: TokenService) {
    }

    ngOnInit(): void {
    }

    navigateToProfile() {
        this.router.navigate(['/profile']);
    }



    navigateToMainOrMap() {
        if (this.tokenService.getToken() === null) {
            this.router.navigate(['/'])
        }
        else this.router.navigate(['/map'])
    }

    checkUserName() {
        this.firstName = <string>sessionStorage.getItem(KEYS.FIRSTNAME)
        this.lastName = <string>sessionStorage.getItem(KEYS.LASTNAME)
        if (!this.firstName && !this.lastName) {
            return false
        } else return true
    }

    concatName() {
        return this.firstName + ' ' + this.lastName
    }
}
