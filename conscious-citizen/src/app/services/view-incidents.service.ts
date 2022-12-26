import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserCredentialsService} from "./user-credentials.service";
import {Incident} from "../models/Incident";
import {API_ROUTES} from "../models/routes";
import {Observable} from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({})
};

@Injectable({
    providedIn: 'root'
})
export class ViewIncidentsService {

    constructor(private http: HttpClient, private userCredentialsService: UserCredentialsService ) {
    }

    getIncidents(): Observable<Incident[]> {
        httpOptions['headers'] = this.userCredentialsService.setTokenHeader(httpOptions['headers']);
        return this.http.get<Incident[]>(API_ROUTES.CREATE_INCIDENT, httpOptions);
    }
}
