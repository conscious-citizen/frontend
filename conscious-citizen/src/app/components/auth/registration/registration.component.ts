import {Component, OnInit} from '@angular/core';
import {PASSWORD_INPUT_TYPE} from "../../../models/constants";
import {Router} from "@angular/router";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {

    showPassword = false;
    showRepeatPassword = false;
    passwordInputType = PASSWORD_INPUT_TYPE;

    constructor() {
    }

    ngOnInit(): void {
    }

    getInputType(inputType: PASSWORD_INPUT_TYPE) {
        switch (inputType) {
            case PASSWORD_INPUT_TYPE.PASSWORD:
                if (this.showPassword) {
                    return 'text';
                }
                return 'password';
            case PASSWORD_INPUT_TYPE.REPEAT_PASSWORD:
                if (this.showRepeatPassword) {
                    return 'text';
                }
                return 'password';
        }
    }

    toggleShowPassword(inputType: PASSWORD_INPUT_TYPE) {
        switch (inputType) {
            case PASSWORD_INPUT_TYPE.PASSWORD:
                this.showPassword = !this.showPassword;
                break;
            case PASSWORD_INPUT_TYPE.REPEAT_PASSWORD:
                this.showRepeatPassword = !this.showRepeatPassword;
                break;
        }
    }

}
