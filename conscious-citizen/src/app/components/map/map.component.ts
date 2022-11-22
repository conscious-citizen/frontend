import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {CreateIncidentComponent} from "../incident/create-incident/create-incident.component";

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
            this.map = new ymaps.Map("map", {
                center: [53.2123113, 50.1793168],
                zoom: 15
            });
            this.map.events.add('click', (e: any) => {
                this.openModalWindow();
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
        })

    }

    openModalWindow(): void {
        this.dialogService.open(CreateIncidentComponent, {closeOnBackdropClick: true});
    }

}
