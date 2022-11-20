/*
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { NbDialogService } from '@nebular/theme';
import { IncidentComponent } from '../incident/incident.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html'
})
export class ProfileComponent implements OnInit {

  isActiveEditing = false;
  editingText = "Режим редактирования";
  buttonText = "Добавить инцидент";

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

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  changeStatusEditing() {
    this.isActiveEditing = !this.isActiveEditing;
    if (this.isActiveEditing) {
      this.buttonText = "Сохранить данные";
      this.editingText = "Выйти из режима редактирования";
    } else {
      this.buttonText = "Добавить инцидент";
      this.editingText = "Режим редактирования";
    }
  }

  checkBtnAction() {
    if (this.buttonText === "Добавить инцидент") {
      this.dialogService.open(IncidentComponent, { closeOnBackdropClick: false });
    }
  }
}*/
