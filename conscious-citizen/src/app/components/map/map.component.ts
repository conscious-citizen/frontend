import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {CreateIncidentComponent} from "../incident/create-incident/create-incident.component";
import {ViewIncidentComponent} from "../incident/view-incident/view-incident.component";

declare const ymaps: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, AfterViewInit {

    map: any;

    constructor(private dialogService: NbDialogService) {
    }

    ngOnInit(): void {
    }

    async waitForMapLoad() {
        return await ymaps.ready();
    }

    ngAfterViewInit(): void {
        /*const openModalWindow = this.openModalWindow;
        const dialogService = this.dialogService;*/
        this.waitForMapLoad().then(()=> {
            let searchControl = new ymaps.control.SearchControl({
                options: {
                    provider: 'yandex#map',
                    noPlacemark: true,
                    noPopup: true,
                    boundedBy: [[53.43594181755453, 49.81755014927146],[53.129779887404894, 50.40531870395897]],
                    kind: 'house',
                    fitMaxWidth: true
                }
            });
            this.map = new ymaps.Map("map", {
                center: [53.2123113, 50.1793168],
                zoom: 15,
                controls: [searchControl]
            });
            this.map.events.add('click', (e: any) => {
                console.log(e.get('coords'));
                ymaps.geocode(e.get('coords')).then((res: any) => {
                    let firstGeoObject = res.geoObjects.get(0);
                    this.openModalWindow(e.get('coords'),firstGeoObject.getAddressLine());
                    console.log(firstGeoObject.getAddressLine());
                })
                /*if (!map.balloon.isOpen()) {
                    const coords = e.get('coords');
                    map.balloon.open(coords, {
                        contentHeader:'Событие!',
                        contentBody:'<p>Кто-то щелкнул по карте.</p>' +
                            '<p>Координаты щелчка: ' + [
                                coords[0].toPrecision(6),
                                coords[1].toPrecision(6)
                            ].join(', ') + '</p>',
                        contentFooter:'<sup>Щелкните еще раз</sup>'
                    });
                }
                else {
                    map.balloon.close();
                }*/
            });
            let myPlacemark = new ymaps.Placemark([53.2123113, 50.1793168], {
                mousedown: this.openModalWindow1,
            });
            myPlacemark.events.add('click', (e: any) => this.openModalWindow1());
            this.map.geoObjects.add(myPlacemark);
        })

    }

    openModalWindow(coords:number[], address: string): void {
        this.dialogService.open(CreateIncidentComponent, {closeOnBackdropClick: true, context: {
            data:{
                coords: coords,
                address: address,
            }
        }});
    }

    openModalWindow1(): void {
        this.dialogService.open(ViewIncidentComponent, {closeOnBackdropClick: true});
    }

}
