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

export class CreateEventEntity {
    messageSubject: string | undefined;
    messageText: string | undefined;
    photo: Blob[] = [];
}
