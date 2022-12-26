import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import emailMask from 'text-mask-addons/dist/emailMask';
import {INPUT_TOOLTIP_ERROR_MESSAGES, Tooltips} from "../../../models/constants";
import {ResetPasswordService} from "../../../services/reset-password.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-reset-password',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
    isAlertActive = false;
    emailMask = emailMask;
    isSubmitClicked = false;
    user: any;
    forgotPasswordForm = new FormGroup({
        email: new FormControl('', [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.email]),
    });
    tooltips: Tooltips = {
        email: {isShow: false, tooltipText: ''}
    }

    constructor(private resetPassword: ResetPasswordService, private router: Router) {
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
        if (this.forgotPasswordForm.getError('required', ['email'])) {
            this.tooltips['email'].tooltipText =
                this.tooltips['email'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
            this.tooltips['email'].isShow = true;
        }
        if (this.forgotPasswordForm.getError('email', ['email'])) {
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
    onCloseAlert(): void {
        this.isAlertActive = false;
    }
    onSubmit() {
        this.isSubmitClicked = true;
        this.resetTooltipMessages();
        this.setTooltipTextForInputs();
        this.isAlertActive = true;
        if (!this.forgotPasswordForm.invalid) {
            this.resetPassword.forgotPassword({
                    user_email: this.forgotPasswordForm.controls['email'].value
                }
            ).subscribe((res) => {

                this.router.navigate(['/login']);
            });
        }

    }
}
