import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { NbDialogService } from '@nebular/theme';
import { IncidentComponent } from '../incident/incident.component';
import {INPUT_TOOLTIP_ERROR_MESSAGES, INPUT_TYPES, ROLES, Tooltips} from "../../../models/constants";
import {UserInfo} from "../../../models/User";
import emailMask from 'text-mask-addons/dist/emailMask';
import {UtilsService} from "../../../services/utils.service";
import {UserInfoService} from "../../../services/user-info.service";
import {take} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html'
})
export class ProfileComponent implements OnInit, AfterViewInit  {

  emailMask = emailMask;
  isSubmitClicked = false;
  isEditMode = false;
  userInfo: UserInfo | null = null;

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

  constructor(private dialogService: NbDialogService,
              private utils: UtilsService,
              private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.profileForm.disable();
  }

  ngAfterViewInit() {
    this.userInfoService.getUserInfo().pipe(take(1)).subscribe((res: any) => {
        let address = this.splitAddress(res.street)
        this.userInfo = {
            city: res?.city,
            email: res?.email,
            fullName: res?.firstName + ' ' +  res?.lastName + ' ' + res?.patronymic,
            login: res?.login,
            phoneNumber: res?.phoneNumber,
            street: address[0],
            building: address[1],
            letter: address[2],
            flatNumber: address[3],
        }
        this.setFieldsValue(this.userInfo);
        console.log(res)
    })
  }

  private setFieldsValue(userInfo: UserInfo): void {
    Object.entries(userInfo).forEach(([key, value]) => {
        console.log(key);
        this.profileForm.controls[key].setValue(value);
    });
  }

  onEditModeChange(): void {
    this.isEditMode = !this.isEditMode;
    !this.isEditMode ? this.profileForm.disable() : this.profileForm.enable();
  }

  onSubmit(): void {
    this.isSubmitClicked = true;
    this.resetTooltipMessages();
    this.setTooltipTextForInputs();
    if (!this.profileForm.invalid) {
        let splitFullName = this.utils.splitFullNameOfForm(this.profileForm);
        this.userInfoService.patchUserInfo({
            firstName: splitFullName[0],
            lastName: splitFullName[1],
            patronymic: splitFullName[2],
            phoneNumber: this.profileForm.controls['phoneNumber'].value,
            email: this.profileForm.controls['email'].value,
            /*house: this.profileForm.controls['building'].value,
            apartament: this.profileForm.controls['flatNumber'].value,*/
            city: this.profileForm.controls['city'].value,
            street: this.buildAddress(),
            username: this.profileForm.controls['login'].value,
        });
    }
  }

  buildAddress(): string {
    return this.profileForm.controls['street'].value + '|' +
        this.profileForm.controls['building'].value + '|' +
        this.profileForm.controls['letter'].value + '|' +
        this.profileForm.controls['flatNumber'].value;
  }

  splitAddress(address: string): string[] {
    return address.split('|');
  }

  changeInputStatus(validatorStateInvalid: boolean): string {
    if (validatorStateInvalid && this.isSubmitClicked) {
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
    if (this.profileForm.getError('required', ['login'])) {
        this.tooltips['login'].tooltipText =
            this.tooltips['login'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
        this.tooltips['login'].isShow = true;
    }
    if (this.profileForm.getError('pattern', ['login'])) {
        this.tooltips['login'].tooltipText = this.tooltips['login'].tooltipText +
            this.utils.insertValueInTooltipMessage(
                INPUT_TOOLTIP_ERROR_MESSAGES.pattern, 'латинские буквы и знаки подчёркивания');
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

  setTooltipMessagesForEmail() {
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

  setTooltipMessagesForPhoneNumber() {
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

  setTooltipMessagesForCity() {
    if (this.profileForm.getError('required', ['city'])) {
        this.tooltips['city'].tooltipText =
            this.tooltips['city'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
        this.tooltips['city'].isShow = true;
    }
  }

  setTooltipMessagesForStreet() {
    if (this.profileForm.getError('required', ['street'])) {
        this.tooltips['street'].tooltipText =
            this.tooltips['street'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
        this.tooltips['street'].isShow = true;
    }
  }

  setTooltipMessagesForBuilding() {
    if (this.profileForm.getError('required', ['building'])) {
        this.tooltips['building'].tooltipText =
            this.tooltips['building'].tooltipText + (INPUT_TOOLTIP_ERROR_MESSAGES.required);
        this.tooltips['building'].isShow = true;
    }
  }

  resetTooltipMessages() {
    Object.entries(this.tooltips).forEach(([key, value]) => {
        this.tooltips[key].tooltipText = '';
        this.tooltips[key].isShow = false;
    });
  }

  openModalWindow() {
      this.dialogService.open(IncidentComponent, { closeOnBackdropClick: false });
  }
}*/
