import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() {
    }

    insertValueInTooltipMessage(message: string, value: string): string {
        return message.replace('{value}',value);
    }

    splitFullNameOfForm(form: FormGroup): any {
        return form.get('fullName')?.value.split(' ');
    }

    splitFullName(fullName: string | undefined): string[] | undefined {
        return fullName ? fullName.split(' ') : undefined;
    }

}
