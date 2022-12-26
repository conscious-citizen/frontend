import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import SwiperCore, {Virtual} from 'swiper';
import {NbDialogRef} from "@nebular/theme";
import {SwiperComponent} from "swiper/angular";
import {Incident} from "../../../models/Incident";
import {CreateDocumentService} from "../../../services/create-document.service";
import {Packer} from 'docx';
import {saveAs} from "file-saver";
import * as fs from "fs";
import * as loc from "libreoffice-convert"
import * as path from "path";
SwiperCore.use([Virtual]);

@Component({
    selector: 'app-view-incident',
    templateUrl: './view-incident.component.html'
})
export class ViewIncidentComponent implements OnInit, OnChanges {
    @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;

    @Input()
    data: Incident | undefined;

    constructor(protected dialogRef: NbDialogRef<any>, private documentService: CreateDocumentService) {
    }

    ngOnInit(): void {
    }

    slideNext() {
        this.swiper?.swiperRef.slideNext(100);
    }

    slidePrev() {
        this.swiper?.swiperRef.slidePrev(100);
    }

    setIncident(incident: Incident): void {
        this.data = incident;
    }

    close() {
        this.dialogRef.close();
    }

    // @ts-ignore
    onSwiper(swiper) {
        console.log(swiper);
    }

    onSlideChange() {
        console.log('slide change');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.data);
    }

    saveDocument() {
        if (this.data)
            fetch(this.data?.photoUrls[0]).then(r => {
                const doc = this.documentService.create(this.data?.actor?.firstName, this.data?.actor?.lastName,
                    this.data?.actor?.patronymic, this.data?.actor?.city, this.data?.actor?.street,
                    this.data?.actor?.house, this.data?.actor?.phoneNumber,
                    this.data?.messageSubject,
                    this.data?.messageText, r.blob(), this.data?.address?.street, this.data?.address?.home);
                Packer.toBlob(doc).then(blob => {
                    console.log(blob);
                    saveAs(blob, "example.docx");
                    console.log("Document created successfully");
                });
            })
    }



}
