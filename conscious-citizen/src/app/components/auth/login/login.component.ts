import {Component, OnInit} from "@angular/core";
import {LoggedUser, User, UserInfo} from "../../../models/User";
import {LoginService} from "../../../services/login.service";
import {INPUT_TOOLTIP_ERROR_MESSAGES, INPUT_TYPES, KEYS, Tooltips} from "../../../models/constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilsService} from "../../../services/utils.service";
import {UserCredentialsService} from "../../../services/user-credentials.service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {UserInfoService} from "../../../services/user-info.service";
import * as Console from "console";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    showPassword = false;
    inputTypes = INPUT_TYPES;
    isSubmitClicked = false;
    loginForm = new FormGroup({
        login: new FormControl('', [Validators.required,
            Validators.pattern('[a-z0-9_-]{3,15}'),
            Validators.minLength(5),
            Validators.maxLength(50)]),
        password: new FormControl('', [Validators.required,
            Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}'),
        ]),
    });
    tooltips: Tooltips = {
        login: {isShow: false, tooltipText: ''},
        password: {isShow: false, tooltipText: ''},
    }
    user: any;
    loggedUser: any;

    constructor(private loginService: LoginService, private utils: UtilsService, private tokenService: UserCredentialsService, private router: Router, private userService: UserInfoService) {
    }

    ngOnInit(): void {

    }

    onSubmit() {
        this.isSubmitClicked = true;
        /*  this.resetTooltipMessages();
          this.setTooltipTextForInputs();*/
        this.validateForm();
        if (!this.loginForm.invalid) {
            this.loginService.login({
                user_name: this.loginForm.controls['login'].value,
                password: this.loginForm.controls['password'].value
            }).pipe(take(1)).subscribe((res) => {
                console.log(res)
                this.tokenService.readLoginResponse(res as LoggedUser);
                this.loggedUser = res;

                this.userService.getUserInfo().pipe(take(1)).subscribe((res) => {
                    // @ts-ignore
                    this.tokenService.saveFirstName(res.firstName);
                    // @ts-ignore
                    this.tokenService.saveLastName(res.lastName);
                    // @ts-ignore
                    this.tokenService.savePatronymic(res.patronymic);

                    this.router.navigate(['/map']);
                })

            });
        }

    }

    validateForm(): void {
        this.resetTooltipMessages();
        this.setTooltipTextForInputs();
    }

    changeInputStatus(formControlName: string, validatorStateInvalid: boolean): string {
        if (validatorStateInvalid && (this.loginForm.controls[formControlName].touched || this.isSubmitClicked))
        {
            return 'danger';
        } else {
            return 'basic';
        }
    }

    setTooltipTextForInputs() {
        this.setTooltipMessagesForLogin();
        this.setTooltipMessagesForPassword();
    }

    setTooltipMessagesForLogin() {
        if (this.loginForm.controls['login'].touched || this.isSubmitClicked) {
            if (this.loginForm.getError('required', ['login'])) {
                this.tooltips['login'].tooltipText =
                    this.tooltips['login'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['login'].isShow = true;
            }
            if (this.loginForm.getError('pattern', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.pattern, 'строчные латинские буквы и знаки подчёркивания');
                this.tooltips['login'].isShow = true;
            }
            if (this.loginForm.getError('minlength', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.minLength, '5');
                this.tooltips['login'].isShow = true;
            }
            if (this.loginForm.getError('maxlength', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.maxLength, '50');
                this.tooltips['login'].isShow = true;
            }
        }
    }

    setTooltipMessagesForPassword() {
        if (this.loginForm.controls['password'].touched || this.isSubmitClicked) {
            if (this.loginForm.getError('required', ['password'])) {
                this.tooltips['password'].tooltipText =
                    this.tooltips['password'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['password'].isShow = true;
            }
            if (this.loginForm.getError('pattern', ['password'])) {
                this.tooltips['password'].tooltipText = this.tooltips['password'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.pattern, 'минимум 8 символов, минимум 1 заглавная и 1 строчная буква, минимум 1 число минимум 1 из символов #?!@$ %^&*-');
                this.tooltips['password'].isShow = true;
            }
        }
    }

    resetTooltipMessages() {
        Object.entries(this.tooltips).forEach(([key, value]) => {
            this.tooltips[key].tooltipText = '';
            this.tooltips[key].isShow = false;
        });
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
