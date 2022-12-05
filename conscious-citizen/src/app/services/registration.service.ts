import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";
import {User} from "../models/User";
import {ROLES} from "../models/constants";

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
        console.log(user)
        return this.http.post(API_ROUTES.REGISTRATION_URL, {username: user.login, password: user.password, phoneNumber: user.phoneNumber,firstName: user.firstName,
            lastName: user.lastName,patronymic: user.patronymic,email: user.email, city: user.city, street: user.street, house: 'house', apartment: 'asd', role: ROLES.ROLE_USER}, httpOptions);
    }
}
