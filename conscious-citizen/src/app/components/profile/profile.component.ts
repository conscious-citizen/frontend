import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    login: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    fullName: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    building: new FormControl(''),
    letter: new FormControl(''),
    flatNumber: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
