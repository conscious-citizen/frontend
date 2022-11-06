import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../../services/token.service";

@Component({
    selector: 'app-top-panel',
    templateUrl: './top-panel.component.html',
})
export class TopPanelComponent implements OnInit {

    constructor(private router: Router, public tokenService: TokenService) {
    }

    ngOnInit(): void {
    }

    navigateToProfile() {
        this.router.navigate(['/profile']);
    }
}
