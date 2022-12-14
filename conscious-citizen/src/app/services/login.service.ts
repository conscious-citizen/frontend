import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Accept':'*/*'})
};

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    login(user: any) {
        const body = {"username": user.user_name, "password": user.password};
        return this.http.post(API_ROUTES.LOGIN_URL, body);
    }
}
