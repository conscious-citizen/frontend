import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import SwiperCore, {Virtual} from 'swiper';
import {NbDialogRef} from "@nebular/theme";
import {SwiperComponent} from "swiper/angular";
import {Incident} from "../../../models/Incident";

SwiperCore.use([Virtual]);

@Component({
    selector: 'app-view-incident',
    templateUrl: './view-incident.component.html'
})
export class ViewIncidentComponent implements OnInit, OnChanges {
    @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;

    @Input()
    data: Incident | undefined;

    constructor(protected dialogRef: NbDialogRef<any>) {
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
}
