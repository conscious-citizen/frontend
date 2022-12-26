import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {CreateIncidentService} from "../../../services/create-incident.service";

@Component({
    selector: 'app-incident',
    templateUrl: './create-incident.component.html',
    styleUrls: ['./create-incident.component.less']
})
export class CreateIncidentComponent implements OnInit {

    @Input()
    data: {
        coords: number[],
        address: string,
    } = {
        coords: [],
        address: '',
    };

    incidentForm = new FormGroup({
        topic: new FormControl(''),
        message: new FormControl(''),
    });

    files: File[] = [];

    constructor(protected dialogRef: NbDialogRef<any>, private createIncidentService: CreateIncidentService) {
    }

    ngOnInit(): void {
    }

    async onSubmit() {
        let splitAddress = this.data.address.split(',');
        const a: File[] = [];
        this.files.map(file => a.push(file));//async file => await this.convertFileToBase64(file).then(file => a.push({photo: file})));
        console.log(a);
        this.createIncidentService.createIncident({
            messageSubject: this.incidentForm.controls['topic'].value,
            messageText: this.incidentForm.controls['message'].value,
            rubricId: 0,
            photo: a,
            addressDto: {
                latitude: this.data.coords[0],
                longitude: this.data.coords[1],
                city: splitAddress[splitAddress.length - 3].trim(),
                street: splitAddress[splitAddress.length - 2].trim(),
                home: splitAddress[splitAddress.length - 1].trim(),
            }
        }).subscribe(res => {
            console.log(res);
            this.dialogRef.close();
        })
    }

    async convertFileToBase64(file: File): Promise<string> {

        return new Promise((resolve) => {
            let fileReader = new FileReader();
            // @ts-ignore
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
    }

    close() {
        this.dialogRef.close();
    }

    fileBrowseHandler(event: any) {
        console.log(this.data);
        this.onDrop(event.target.files);
    }

    onDrop(event: FileList) {
        for (let i = 0; i < event.length; i++){
            // @ts-ignore
            console.log(event[i]);
            this.files.push(event[i]);
        }
    }

    formatBytes(bytes = 0, decimals = 1) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}
