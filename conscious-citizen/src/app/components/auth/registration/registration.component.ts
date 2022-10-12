import {Component, OnInit} from '@angular/core';

enum PasswordInputTypes {
    PASSWORD,
    REPEAT_PASSWORD
}

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {

    showPassword = false;
    showRepeatPassword = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    getInputType(inputType: PasswordInputTypes) {
        switch (inputType) {
            case PasswordInputTypes.PASSWORD:
                if (this.showPassword) {
                    return 'text';
                }
                return 'password';
            case PasswordInputTypes.REPEAT_PASSWORD:
                if (this.showRepeatPassword) {
                    return 'text';
                }
                return 'password';
        }
    }

    toggleShowPassword(inputType: PasswordInputTypes) {
        switch (inputType) {
            case PasswordInputTypes.PASSWORD:
                this.showPassword = !this.showPassword;
                break;
            case PasswordInputTypes.REPEAT_PASSWORD:
                this.showRepeatPassword = !this.showRepeatPassword;
                break;
        }
    }

}
