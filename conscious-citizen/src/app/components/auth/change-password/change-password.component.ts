import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
});

  constructor() { }

  ngOnInit(): void {
  }

}
