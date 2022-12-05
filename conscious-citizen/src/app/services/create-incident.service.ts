import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";

@Injectable({
    providedIn: 'root'
})
export class CreateIncidentService {

    constructor(private http: HttpClient) {
    }

    login(user: any) {
        const body = {"username": user.user_name, "password": user.password};
        return this.http.post(API_ROUTES.LOGIN_URL, body);
    }
}
