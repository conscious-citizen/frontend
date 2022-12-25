import {Address} from "./Address";

export class EventEntity {
    /*id: number | undefined;
    user: number | undefined;
    rubric: number | undefined;
    address: Address | undefined;
    template;
    status;
    messageSubject: string | undefined;
    messageText: string | undefined;
    photo: Blob[] = [];
    currentDate: Date | undefined;
    result: boolean = false;*/
}

export class CreateIncidentEntity {
    messageSubject: string | undefined;
    messageText: string | undefined;
    photo: File[] = [];
    rubricId: number =  0;
    addressDto:
        {
            "longitude": number,
            "latitude": number,
            "city": string,
            "street": string,
            "home": string,
        } | undefined
}
