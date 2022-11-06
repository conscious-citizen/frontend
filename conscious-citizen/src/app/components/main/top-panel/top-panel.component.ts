import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-top-panel',
    templateUrl: './top-panel.component.html',
})
export class TopPanelComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {

    }

    navigateToProfile() {
        this.router.navigate(['/profile']);
    }
}
