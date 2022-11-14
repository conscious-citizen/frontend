import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html'
})
export class IncidentComponent implements OnInit {

  incidentForm = new FormGroup({
    topic: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });

  constructor(protected dialogRef: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}