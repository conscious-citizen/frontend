import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";
import {User} from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    constructor(private http: HttpClient) {
    }

    registration(user: User) {
        return this.http.post(API_ROUTES.REGISTRATION_URL, user);
    }
}
