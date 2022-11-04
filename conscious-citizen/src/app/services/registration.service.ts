import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";
import {User} from "../models/User";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http: HttpClient) {
    }

    registration(user: User) {
        return this.http.post(API_ROUTES.REGISTRATION_URL, {username: user.login, password: user.password, email: user.eMail, city: user.city, street: user.street, house: '', apartment: 'asd', role: 'USER'}, httpOptions);
    }
}
