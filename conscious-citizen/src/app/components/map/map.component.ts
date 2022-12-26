import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NbDialogRef, NbDialogService} from "@nebular/theme";
import {CreateIncidentComponent} from "../incident/create-incident/create-incident.component";
import {ViewIncidentComponent} from "../incident/view-incident/view-incident.component";
import {Incident} from "../../models/Incident";
import {ViewIncidentsService} from "../../services/view-incidents.service";
import {take} from "rxjs";

declare const ymaps: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, AfterViewInit {

    map: any;
    incidents: Incident[] = [];
    openedDialog: NbDialogRef<any> | null = null;

    constructor(private dialogService: NbDialogService, private viewIncidentsService: ViewIncidentsService) {
        /* this.viewIncidentsService.getIncidents().pipe(take(1)).subscribe(incidents => {
             this.incidents = [...incidents];
         })*/
    }

    ngOnInit(): void {
    }

    async waitForMapLoad() {
        return await ymaps.ready();
    }

    ngAfterViewInit(): void {
        /*const openModalWindow = this.openModalWindow;
        const dialogService = this.dialogService;*/
        this.waitForMapLoad().then(() => {
            let searchControl = new ymaps.control.SearchControl({
                options: {
                    provider: 'yandex#map',
                    noPlacemark: true,
                    noPopup: true,
                    boundedBy: [[53.43594181755453, 49.81755014927146], [53.129779887404894, 50.40531870395897]],
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
                    this.openCreateModalWindow(e.get('coords'), firstGeoObject.getAddressLine());
                    console.log(firstGeoObject.getAddressLine());
                });
            });
            this.fetchData();
        })

    }

    openCreateModalWindow(coords: number[], address: string): void {
        this.openedDialog = this.dialogService.open(CreateIncidentComponent, {
            closeOnBackdropClick: true, context: {
                data: {
                    coords: coords,
                    address: address,
                }
            }
        });
        this.openedDialog.onClose.pipe(take(1)).subscribe(() => this.fetchData())
    }

    openViewModalWindow(incident: Incident): void {
        //console.log(e.get('coords'));
        //const coords = e.get('coords');
        console.log(incident);
        let ref = this.dialogService.open(ViewIncidentComponent, {
            closeOnBackdropClick: true, context: {
                data: incident,
            }
        });
        ref.componentRef.instance.setIncident(incident);
    }

    private fetchData() {
        this.viewIncidentsService.getIncidents().pipe(take(1)).subscribe(incidents => {
            this.incidents = [...incidents];
            this.incidents.forEach(incident => {
                const myPlacemark = new ymaps.Placemark([incident?.address?.latitude, incident?.address?.longitude], {
                    mousedown: this.openViewModalWindow,
                });
                myPlacemark.events.add('click', (e: any) => this.openViewModalWindow(incident));
                this.map.geoObjects.add(myPlacemark);
            });
        })
    }

}
