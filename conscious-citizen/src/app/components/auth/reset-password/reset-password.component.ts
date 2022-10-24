import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import emailMask from 'text-mask-addons/dist/emailMask';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  emailMask = emailMask;

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]),
});

  constructor() { }

  ngOnInit(): void {
  }

}
