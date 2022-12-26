import {Address} from "./Address";

export class Incident {
    id: number | undefined;
    actor: {
        id: number | undefined,
        firstName: string | undefined,
        lastName: string | undefined,
        patronymic: string | undefined,
        phoneNumber: string | undefined,
        email: string | undefined,
        city: string | undefined,
        street: string | undefined,
        house: string | undefined,
        apartment: string | undefined,
        login: string | undefined,
        status: string | undefined,
    } | undefined;
    rubricId: number | undefined;
    address: {
        id: number | undefined,
        event: null,
        eventDraft: null,
        longitude: number | undefined,
        latitude: number | undefined,
        city: string | undefined,
        street: string | undefined,
        home: string | undefined,
    } | undefined;
    /*"template": null,*/
    status: boolean | undefined;
    messageSubject: string | undefined;
    messageText: string | undefined;
    currentDate: string | undefined;
    result: boolean | undefined;
    photoUrls: string[] = [];
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
