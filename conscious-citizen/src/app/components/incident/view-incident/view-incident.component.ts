import {Component, OnInit, ViewChild} from "@angular/core";
import SwiperCore, {Virtual} from 'swiper';
import {NbDialogRef} from "@nebular/theme";
import {SwiperComponent} from "swiper/angular";

SwiperCore.use([Virtual]);

@Component({
    selector: 'app-view-incident',
    templateUrl: './view-incident.component.html'
})
export class ViewIncidentComponent implements OnInit {
    @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;

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
}
