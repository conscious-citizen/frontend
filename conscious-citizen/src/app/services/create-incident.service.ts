import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";
import {CreateIncidentEntity} from "../models/EventEntity";
import {UserCredentialsService} from "./user-credentials.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class CreateIncidentService {

    constructor(private http: HttpClient, private userCredentialsService: UserCredentialsService ) {
    }

    createIncident(incident: CreateIncidentEntity) {
        //const body = JSON.stringify(incident);
        console.log('CREATED INCIDENT DEBUG', incident);
        httpOptions['headers'] = this.userCredentialsService.setTokenHeader(httpOptions['headers']);
        return this.http.post(API_ROUTES.CREATE_INCIDENT, incident, httpOptions);
    }
}
