import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';

@Component({
    selector: 'app-incident',
    templateUrl: './create-incident.component.html',
    styleUrls: ['./create-incident.component.less']
})
export class CreateIncidentComponent implements OnInit {

    incidentForm = new FormGroup({
        topic: new FormControl(''),
        message: new FormControl(''),
    });

    files: File[] = [];

    constructor(protected dialogRef: NbDialogRef<any>) {
    }

    ngOnInit(): void {
        /*window.addEventListener("dragover",function(e){
            e = e || event;
            e.preventDefault();
        },false);
        window.addEventListener("drop",function(e){
            e = e || event;
            e.preventDefault();
        },false);*/
    }

    close() {
        this.dialogRef.close();
    }

    fileBrowseHandler(event: any) {
        this.onDrop(event.target.files);
    }

    onDrop(event: FileList) {
        for (let i = 0; i < event.length; i++){
            // @ts-ignore
            console.log(event[i]);
            this.files.push(event[i]);
        }
        /*if (files)
        this.files.push(files[0]);*/
    }

    formatBytes(bytes = 0, decimals = 1) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}
