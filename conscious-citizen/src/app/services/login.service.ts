import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {
    }

    login(user: any) {
        const body = {"user_name": user.user_name, "password": user.password};
        return this.http.post(API_ROUTES.LOGIN_URL, body);
    }
}
