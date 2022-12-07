import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {INPUT_TOOLTIP_ERROR_MESSAGES, INPUT_TYPES, Tooltip, Tooltips} from "../../../models/constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilsService} from "../../../services/utils.service";
import {RegistrationService} from "../../../services/registration.service";
import {Router} from "@angular/router";
import {User} from "../../../models/User";
import emailMask from 'text-mask-addons/dist/emailMask';
import * as Console from "console";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
    emailMask = emailMask;
    showPassword = false;
    showRepeatPassword = false;
    inputTypes = INPUT_TYPES;
    isSubmitClicked = false;
    isRepeatPasswordValid = true;
    isAlertActive = false;

    registrationForm = new FormGroup({
        login: new FormControl('', [Validators.required,
            Validators.pattern('[a-z0-9_-]{3,15}'),
            Validators.minLength(5),
            Validators.maxLength(50)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,
            Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}'),
        ]),
        repeatPassword: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[\+]?[0-9]{3}?[0-9]{8}')]),
        fullName: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required, Validators.pattern('[а-яА-ЯёЁ0-9 -]+')]),
        street: new FormControl('', [Validators.required, Validators.pattern('[а-яА-ЯёЁ0-9 -]+')]),
        building: new FormControl('', [Validators.required, Validators.pattern('([0-9]+)?[\\/]?[0-9]+')]),
        letter: new FormControl(''),
        flatNumber: new FormControl('')
    });

    tooltips: Tooltips = {
        login: {isShow: false, tooltipText: ''},
        email: {isShow: false, tooltipText: ''},
        password: {isShow: false, tooltipText: ''},
        repeatPassword: {isShow: false, tooltipText: ''},
        phoneNumber: {isShow: false, tooltipText: ''},
        fullName: {isShow: false, tooltipText: ''},
        city: {isShow: false, tooltipText: ''},
        street: {isShow: false, tooltipText: ''},
        building: {isShow: false, tooltipText: ''},
    }

    constructor(private utils: UtilsService,
                private cdr: ChangeDetectorRef,
                private registrationService: RegistrationService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.isSubmitClicked = true;
        this.validateForm();
        if (!this.registrationForm.invalid) {
            let splitFullName = this.splitFullName();
            this.registrationService.registration(new User(
                splitFullName[0],
                splitFullName[1],
                splitFullName[2],
                this.registrationForm.controls['phoneNumber'].value,
                this.registrationForm.controls['email'].value,
                this.registrationForm.controls['city'].value,
                this.buildAddress(),
                this.registrationForm.controls['login'].value,
                this.registrationForm.controls['password'].value
            )).subscribe((res) => {
                this.isAlertActive = true;
            });
        }
    }

    onCloseAlert(): void {
        this.isAlertActive = false;
        this.router.navigate(['/login']);
    }

    validateForm(): void {
        this.resetTooltipMessages();
        this.setTooltipTextForInputs();
    }

    splitFullName(): any {
        return this.registrationForm.controls['fullName'].value.split(' ');
    }

    buildAddress(): string {
        return this.registrationForm.controls['street'].value + '|' +
            this.registrationForm.controls['building'].value + '|' +
            this.registrationForm.controls['letter'].value + '|' +
            this.registrationForm.controls['flatNumber'].value;
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

    changeInputStatus(formControlName:string, validatorStateInvalid: boolean): string {
        if (validatorStateInvalid && (this.registrationForm.controls[formControlName].touched || this.isSubmitClicked)) {
            return 'danger';
        } else {
            return 'basic';
        }
    }

    changeInputStatusForRepeatPassword(validatorStateInvalid?: boolean): string {
        if (!this.isRepeatPasswordValid || (validatorStateInvalid && (this.registrationForm.controls['repeatPassword'].touched || this.isSubmitClicked))) {
            return 'danger';
        } else {
            return 'basic';
        }
    }

    setTooltipTextForInputs() {
        this.setTooltipMessagesForLogin();
        this.setTooltipMessagesForEmail();
        this.setTooltipMessagesForPassword();
        this.setTooltipMessagesForRepeatPassword();
        this.setTooltipMessagesForPhoneNumber();
        this.setTooltipMessagesForCity();
        this.setTooltipMessagesForStreet();
        this.setTooltipMessagesForBuilding();
    }

    setTooltipMessagesForLogin() {
        if (this.registrationForm.controls['login'].touched || this.isSubmitClicked) {
            if (this.registrationForm.getError('required', ['login'])) {
                this.tooltips['login'].tooltipText =
                    this.tooltips['login'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['login'].isShow = true;
            }
            if (this.registrationForm.getError('pattern', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.pattern, 'строчные латинские буквы и знаки подчёркивания');
                this.tooltips['login'].isShow = true;
            }
            if (this.registrationForm.getError('minlength', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.minLength, '5');
                this.tooltips['login'].isShow = true;
            }
            if (this.registrationForm.getError('maxlength', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.maxLength, '50');
                this.tooltips['login'].isShow = true;
            }
        }
    }

    setTooltipMessagesForEmail() {
        if (this.registrationForm.controls['email'].touched || this.isSubmitClicked) {
            if (this.registrationForm.getError('required', ['email'])) {
                this.tooltips['email'].tooltipText =
                    this.tooltips['email'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['email'].isShow = true;
            }
            if (this.registrationForm.getError('email', ['email'])) {
                this.tooltips['email'].tooltipText =
                    this.tooltips['email'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.email);
                this.tooltips['email'].isShow = true;
            }
        }
    }

    setTooltipMessagesForPassword() {
        if (this.registrationForm.controls['password'].touched || this.isSubmitClicked) {
            if (this.registrationForm.getError('required', ['password'])) {
                this.tooltips['password'].tooltipText =
                    this.tooltips['password'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['password'].isShow = true;
            }
            if (this.registrationForm.getError('pattern', ['password'])) {
                this.tooltips['password'].tooltipText = this.tooltips['password'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.pattern, 'минимум 8 символов, минимум 1 заглавная и 1 строчная буква, минимум 1 число минимум 1 из символов #?!@$ %^&*-');
                this.tooltips['password'].isShow = true;
            }
        }
    }

    setTooltipMessagesForRepeatPassword() {
        if (this.registrationForm.controls['repeatPassword'].touched || this.isSubmitClicked) {
            if (this.registrationForm.getError('required', ['repeatPassword'])) {
                this.tooltips['repeatPassword'].tooltipText =
                    this.tooltips['repeatPassword'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['repeatPassword'].isShow = true;
            }
        }
    }

    setTooltipMessagesForPhoneNumber() {
        if (this.registrationForm.controls['phoneNumber'].touched || this.isSubmitClicked) {
            if (this.registrationForm.getError('required', ['phoneNumber'])) {
                this.tooltips['phoneNumber'].tooltipText =
                    this.tooltips['phoneNumber'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['phoneNumber'].isShow = true;
            }
            if (this.registrationForm.getError('pattern', ['phoneNumber'])) {
                this.tooltips['phoneNumber'].tooltipText = this.tooltips['phoneNumber'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.pattern, '+79990002233');
                this.tooltips['phoneNumber'].isShow = true;
            }
        }
    }

    setTooltipMessagesForCity() {
        if (this.registrationForm.controls['city'].touched || this.isSubmitClicked) {
            if (this.registrationForm.getError('required', ['city'])) {
                this.tooltips['city'].tooltipText =
                    this.tooltips['city'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['city'].isShow = true;
            }
        }
    }

    setTooltipMessagesForStreet() {
        if (this.registrationForm.controls['street'].touched || this.isSubmitClicked) {
            if (this.registrationForm.getError('required', ['street'])) {
                this.tooltips['street'].tooltipText =
                    this.tooltips['street'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['street'].isShow = true;
            }
        }
    }

    setTooltipMessagesForBuilding() {
        if (this.registrationForm.controls['building'].touched || this.isSubmitClicked) {
            if (this.registrationForm.getError('required', ['building'])) {
                this.tooltips['building'].tooltipText =
                    this.tooltips['building'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['building'].isShow = true;
            }
        }
    }

    resetTooltipMessages() {
        Object.entries(this.tooltips).forEach(([key, value]) => {
            this.tooltips[key].tooltipText = '';
            this.tooltips[key].isShow = false;
        });
    }

    repeatPasswordValidate(event: any): void {
        this.tooltips['repeatPassword'].tooltipText = '';
        this.tooltips['repeatPassword'].isShow = false;
        this.isRepeatPasswordValid = true;
        if (this.registrationForm.controls['password'].value !== event.target.value) {
            this.tooltips['repeatPassword'].tooltipText =
                this.tooltips['repeatPassword'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.password);
            this.tooltips['repeatPassword'].isShow = true;
            this.isRepeatPasswordValid = false;
        }
    }

}
