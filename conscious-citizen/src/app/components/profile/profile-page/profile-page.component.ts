import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NbDialogService} from '@nebular/theme';
import {CreateIncidentComponent} from '../../incident/create-incident/create-incident.component';
import {INPUT_TOOLTIP_ERROR_MESSAGES, INPUT_TYPES, ROLES, Tooltips} from "../../../models/constants";
import {UserInfo} from "../../../models/User";
import emailMask from 'text-mask-addons/dist/emailMask';
import {UtilsService} from "../../../services/utils.service";
import {UserInfoService} from "../../../services/user-info.service";
import {BehaviorSubject, Subject, take, takeUntil} from "rxjs";
import {UserStoreService} from "../../../stores/user-store.service";
import {UserCredentialsService} from "../../../services/user-credentials.service";
import {AutoUnsubscribe} from "../../abstract/auto-unsubscribe.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile-page.component.html'
})
export class ProfileComponent implements OnInit, AfterViewInit {

    emailMask = emailMask;
    isSubmitClicked = false;
    userInfo: BehaviorSubject<UserInfo> | null = null;
    subscribe: Subject<void> = new Subject<void>();
    selectedItem = '1';



    profileForm = new FormGroup({
        login: new FormControl('', [Validators.required,
            Validators.pattern('[a-z0-9_-]{3,15}'),
            Validators.minLength(5),
            Validators.maxLength(50)]),
        email: new FormControl('', [Validators.required, Validators.email]),
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
        repeatPassword: {isShow: false, tooltipText: ''},
        phoneNumber: {isShow: false, tooltipText: ''},
        fullName: {isShow: false, tooltipText: ''},
        city: {isShow: false, tooltipText: ''},
        street: {isShow: false, tooltipText: ''},
        building: {isShow: false, tooltipText: ''},
    }

    constructor(private utils: UtilsService,
                private cdr: ChangeDetectorRef,
                private userInfoService: UserInfoService,
                private userCredentialsService: UserCredentialsService,
                private userStoreService: UserStoreService,
                private router: Router,) {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.userInfo = this.userStoreService.user;
    }

    reSubscribe() {
        this.subscribe.next();
        this.subscribe.complete();
        this.subscribe = new Subject<void>();
    }

    getUserInfo(): void {

        this.userInfoService.getUserInfo().pipe(take(1)).subscribe((res: any) => {
            let address = this.splitAddress(res.street)
            this.userStoreService.setCurrentUser({
                city: res?.city,
                email: res?.email,
                fullName: res?.firstName + ' ' + res?.lastName + ' ' + res?.patronymic,
                login: res?.login,
                phoneNumber: res?.phoneNumber,
                street: address[0],
                building: address[1],
                letter: address[2],
                flatNumber: address[3],
            })
            this.userInfo = this.userStoreService.user;
            this.reSubscribe();
            this.userInfo?.pipe(takeUntil(this.subscribe)).subscribe(userInfo => {
                let splitName = this.utils.splitFullName(this.userInfo?.value.fullName);
                if (this.userInfo?.value && splitName) {
                    this.userCredentialsService.resetUserDataWithoutLogout({
                        username: this.userInfo?.value.login,
                        firstName: splitName[0],
                        lastName: splitName[1],
                        patronymic: splitName[2],
                    });
                    this.setFieldsValue(this.userInfo.value);
                }
            });
        })
    }

    ngAfterViewInit() {
        this.getUserInfo();
    }

    private setFieldsValue(userInfo: UserInfo): void {
        Object.entries(userInfo).forEach(([key, value]) => {
            console.log(key);
            this.profileForm.controls[key].setValue(value);
        });
    }

    onSubmit(): void {
        this.isSubmitClicked = true;
        this.validateForm();
        if (!this.profileForm.invalid) {
            let splitFullName = this.utils.splitFullNameOfForm(this.profileForm);
            this.cdr.detectChanges();
            this.userInfoService.patchUserInfo({
                firstName: splitFullName[0],
                lastName: splitFullName[1],
                patronymic: splitFullName[2],
                phoneNumber: this.profileForm.get('phoneNumber')?.value,

                /*house: this.profileForm.controls['building'].value,
                apartament: this.profileForm.controls['flatNumber'].value,*/
                city: 'Самара',
                street: this.buildAddress(),
                login: this.profileForm.get('login')?.value,
            }).pipe(take(1)).subscribe(res => {
                this.getUserInfo();
            });
          if (this.userCredentialsService.getUsername()!= this.profileForm.get('login')?.value){
              this.userCredentialsService.signOut();
              this.router.navigate(['/login'])
          }
        }
    }

    buildAddress(): string {
        console.log(this.profileForm.get('street')?.value + '|' +
            this.profileForm.controls['building'].value + '|' +
            this.profileForm.controls['letter'].value + '|' +
            this.profileForm.controls['flatNumber'].value)
        return this.profileForm.get('street')?.value + '|' +
            this.profileForm.get('building')?.value + '|' +
            this.profileForm.get('letter')?.value + '|' +
            this.profileForm.get('flatNumber')?.value;
    }

    splitAddress(address: string): string[] {
        return address.split('|');
    }

    changeInputStatus(formControlName:string, validatorStateInvalid: boolean): string {
        if (validatorStateInvalid && (this.profileForm.controls[formControlName].touched || this.isSubmitClicked)) {
            return 'danger';
        } else {
            return 'basic';
        }
    }

    setTooltipTextForInputs() {
        this.setTooltipMessagesForLogin();
        this.setTooltipMessagesForEmail();
        this.setTooltipMessagesForPhoneNumber();
        this.setTooltipMessagesForCity();
        this.setTooltipMessagesForStreet();
        this.setTooltipMessagesForBuilding();
    }

    setTooltipMessagesForLogin() {
        if (this.profileForm.controls['login'].touched || this.isSubmitClicked) {
            if (this.profileForm.getError('required', ['login'])) {
                this.tooltips['login'].tooltipText =
                    this.tooltips['login'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['login'].isShow = true;
            }
            if (this.profileForm.getError('pattern', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.pattern, 'строчные латинские буквы и знаки подчёркивания');
                this.tooltips['login'].isShow = true;
            }
            if (this.profileForm.getError('minlength', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.minLength, '5');
                this.tooltips['login'].isShow = true;
            }
            if (this.profileForm.getError('maxlength', ['login'])) {
                this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.maxLength, '50');
                this.tooltips['login'].isShow = true;
            }
        }
    }

    setTooltipMessagesForEmail() {
        if (this.profileForm.controls['email'].touched || this.isSubmitClicked) {
            if (this.profileForm.getError('required', ['email'])) {
                this.tooltips['email'].tooltipText =
                    this.tooltips['email'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['email'].isShow = true;
            }
            if (this.profileForm.getError('email', ['email'])) {
                this.tooltips['email'].tooltipText =
                    this.tooltips['email'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.email);
                this.tooltips['email'].isShow = true;
            }
        }
    }

    setTooltipMessagesForPhoneNumber() {
        if (this.profileForm.controls['phoneNumber'].touched || this.isSubmitClicked) {
            if (this.profileForm.getError('required', ['phoneNumber'])) {
                this.tooltips['phoneNumber'].tooltipText =
                    this.tooltips['phoneNumber'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['phoneNumber'].isShow = true;
            }
            if (this.profileForm.getError('pattern', ['phoneNumber'])) {
                this.tooltips['phoneNumber'].tooltipText = this.tooltips['phoneNumber'].tooltipText +
                    this.utils.insertValueInTooltipMessage(
                        INPUT_TOOLTIP_ERROR_MESSAGES.pattern, '+79990002233');
                this.tooltips['phoneNumber'].isShow = true;
            }
        }
    }

    setTooltipMessagesForCity() {
        if (this.profileForm.controls['city'].touched || this.isSubmitClicked) {
            if (this.profileForm.getError('required', ['city'])) {
                this.tooltips['city'].tooltipText =
                    this.tooltips['city'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['city'].isShow = true;
            }
        }
    }

    setTooltipMessagesForStreet() {
        if (this.profileForm.controls['street'].touched || this.isSubmitClicked) {
            if (this.profileForm.getError('required', ['street'])) {
                this.tooltips['street'].tooltipText =
                    this.tooltips['street'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['street'].isShow = true;
            }
        }
    }

    setTooltipMessagesForBuilding() {
        if (this.profileForm.controls['building'].touched || this.isSubmitClicked) {
            if (this.profileForm.getError('required', ['building'])) {
                this.tooltips['building'].tooltipText =
                    this.tooltips['building'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
                this.tooltips['building'].isShow = true;
            }
        }
    }
    validateForm(): void {
        this.resetTooltipMessages();
        this.setTooltipTextForInputs();
    }
    resetTooltipMessages() {
        Object.entries(this.tooltips).forEach(([key, value]) => {
            this.tooltips[key].tooltipText = '';
            this.tooltips[key].isShow = false;
        });
    }
}
