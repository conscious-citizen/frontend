import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {INPUT_TOOLTIP_ERROR_MESSAGES, INPUT_TYPES, Tooltips} from "../../../models/constants";
import {UtilsService} from "../../../services/utils.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  showPassword = false;
  showRepeatPassword = false;
  inputTypes = INPUT_TYPES;
  isSubmitClicked = false;
  isRepeatPasswordValid = true;

  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required,
      Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}'),
    ]),
    repeatPassword: new FormControl('', [Validators.required])
  });

  tooltips: Tooltips = {
    password: {isShow: false, tooltipText: ''},
    repeatPassword: {isShow: false, tooltipText: ''},
  }

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isSubmitClicked = true;
    this.resetTooltipMessages();
    this.setTooltipTextForInputs();
  }

  getPasswordInputType(inputType: INPUT_TYPES.PASSWORD | INPUT_TYPES.REPEAT_PASSWORD) {
    switch (inputType) {
        case INPUT_TYPES.PASSWORD:
            if (this.showPassword) {
                return 'text';
            }
            return 'password';
        case INPUT_TYPES.REPEAT_PASSWORD:
            if (this.showRepeatPassword) {
                return 'text';
            }
            return 'password';
        }
  }

  changeInputStatus(validatorStateInvalid: boolean): string {
    if (validatorStateInvalid && this.isSubmitClicked) {
        return 'danger';
    } else {
        return 'basic';
    }
  }

  changeInputStatusForRepeatPassword(validatorStateInvalid?: boolean): string {
    if (!this.isRepeatPasswordValid || (validatorStateInvalid && this.isSubmitClicked)) {
        return 'danger';
    } else {
        return 'basic';
    }
  }

  toggleShowPassword(inputType: INPUT_TYPES) {
    switch (inputType) {
        case INPUT_TYPES.PASSWORD:
            this.showPassword = !this.showPassword;
            break;
        case INPUT_TYPES.REPEAT_PASSWORD:
            this.showRepeatPassword = !this.showRepeatPassword;
            break;
    }
  }

  repeatPasswordValidate(event: any): void {
    this.tooltips['repeatPassword'].tooltipText = '';
    this.tooltips['repeatPassword'].isShow = false;
    this.isRepeatPasswordValid = true;
    if (this.changePasswordForm.controls['password'].value !== event.target.value) {
        this.tooltips['repeatPassword'].tooltipText =
            this.tooltips['repeatPassword'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.password);
        this.tooltips['repeatPassword'].isShow = true;
        this.isRepeatPasswordValid = false;
    }
  }

  setTooltipTextForInputs() {
    this.setTooltipMessagesForPassword();
    this.setTooltipMessagesForRepeatPassword();
  }

  setTooltipMessagesForPassword() {
    if (this.changePasswordForm.getError('required', ['password'])) {
        this.tooltips['password'].tooltipText =
            this.tooltips['password'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
        this.tooltips['password'].isShow = true;
    }
    if (this.changePasswordForm.getError('pattern', ['password'])) {
        this.tooltips['password'].tooltipText = this.tooltips['password'].tooltipText +
            this.utils.insertValueInTooltipMessage(
                INPUT_TOOLTIP_ERROR_MESSAGES.pattern, 'минимум 8 символов, минимум 1 заглавная буква, минимум 1 число минимум 1 из символов #?!@$ %^&*-');
        this.tooltips['password'].isShow = true;
    }
  }
  
  setTooltipMessagesForRepeatPassword() {
    if (this.changePasswordForm.getError('required', ['repeatPassword'])) {
        this.tooltips['repeatPassword'].tooltipText =
            this.tooltips['repeatPassword'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
        this.tooltips['repeatPassword'].isShow = true;
    }
  }

  resetTooltipMessages() {
    Object.entries(this.tooltips).forEach(([key, value]) => {
        this.tooltips[key].tooltipText = '';
        this.tooltips[key].isShow = false;
    });
  }
}
