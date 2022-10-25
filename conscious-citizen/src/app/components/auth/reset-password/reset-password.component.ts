import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import emailMask from 'text-mask-addons/dist/emailMask';
import {INPUT_TOOLTIP_ERROR_MESSAGES, Tooltips} from "../../../models/constants";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

    emailMask = emailMask;
    isSubmitClicked = false;

    resetPasswordForm = new FormGroup({
        email: new FormControl('', [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.email]),
    });
    tooltips: Tooltips = {
       email: {isShow: false, tooltipText: ''}
    }

    constructor() {
    }

    ngOnInit(): void {
    }
    changeInputStatus(validatorStateInvalid: boolean): string {
        if (validatorStateInvalid && this.isSubmitClicked) {
            return 'danger';
        } else {
            return 'basic';
        }
    }

    setTooltipTextForInputs() {
       this.setTooltipMessagesForEmail()
    }
    setTooltipMessagesForEmail() {
        if (this.resetPasswordForm.getError('required', ['email'])) {
            this.tooltips['email'].tooltipText =
                this.tooltips['email'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
            this.tooltips['email'].isShow = true;
        }
        if (this.resetPasswordForm.getError('email', ['email'])) {
            this.tooltips['email'].tooltipText =
                this.tooltips['email'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.email);
            this.tooltips['email'].isShow = true;
        }
    }
    resetTooltipMessages() {
        Object.entries(this.tooltips).forEach(([key, value]) => {
            this.tooltips[key].tooltipText = '';
            this.tooltips[key].isShow = false;
        });
    }
    onSubmit() {
        this.isSubmitClicked = true;
        this.resetTooltipMessages();
        this.setTooltipTextForInputs();
    /*    if (!this.resetPasswordForm.invalid) {
            this.loginService.login({
                user_name: this.loginForm.controls['login'].value,
                password: this.loginForm.controls['password'].value
            }).subscribe((res) => {
                this.loggedUser = res;
            });
        }*/
    }
}
