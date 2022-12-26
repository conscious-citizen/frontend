import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";
import {CreateIncidentEntity} from "../models/Incident";
import {UserCredentialsService} from "./user-credentials.service";

const httpOptions = {
    headers: new HttpHeaders({})
};

@Injectable({
    providedIn: 'root'
})
export class CreateIncidentService {

    constructor(private http: HttpClient, private userCredentialsService: UserCredentialsService ) {
    }

    createIncident(incident: CreateIncidentEntity) {
        let formData = new FormData();
        incident.messageText && formData.append('messageText',incident.messageText);
        incident.messageSubject && formData.append('messageSubject', incident.messageSubject);
        formData.append('rubricId', incident.rubricId.toString());
        incident.addressDto && formData.append('addressDto', JSON.stringify(incident.addressDto));
        incident.photo && incident.photo[0] && formData.append('firstFile', incident.photo[0]);
        incident.photo && incident.photo[1] && formData.append('secondFile', incident.photo[1]);
        incident.photo && incident.photo[2] && formData.append('thirdFile', incident.photo[2]);

        console.log('CREATED INCIDENT DEBUG', formData.get('rubricId'));
        httpOptions['headers'] = this.userCredentialsService.setTokenHeader(httpOptions['headers']);
        return this.http.post(API_ROUTES.CREATE_INCIDENT, formData, httpOptions);
    }
}
