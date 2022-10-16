import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() {
    }

    insertValueInTooltipMessage(message: string, value: string): string {
        return message.replace('{value}',value);
    }

}
