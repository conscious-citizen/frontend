import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    showPassword = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    getInputType() {
        if (this.showPassword) {
            return 'text';
        }
        return 'password';
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }

}
