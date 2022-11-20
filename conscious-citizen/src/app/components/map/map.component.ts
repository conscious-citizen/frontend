import {AfterViewInit, Component, OnInit} from '@angular/core';
declare const ymaps: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, AfterViewInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        ymaps.ready(() => {
            let myMap = new ymaps.Map("map", {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                // Чтобы не определять координаты центра карты вручную,
                // воспользуйтесь инструментом Определение координат.
                center: [53.2123113,50.1793168],
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 15
            });
        });
    }

}
