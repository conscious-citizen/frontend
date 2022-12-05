import {Injectable} from "@angular/core";
import {User, UserInfo, UserInfoForUpdate} from "../models/User";
import {API_ROUTES} from "../models/routes";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserCredentialsService} from "./user-credentials.service";
import {Observable} from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    constructor(private http: HttpClient, private tokenService: UserCredentialsService) {
    }

    getUserInfo(): Observable<any> {
        httpOptions['headers'] = this.tokenService.setTokenHeader(httpOptions['headers']);
        return this.http.get(API_ROUTES.GET_USER_INFO, httpOptions);
    }

    patchUserInfo(user: UserInfoForUpdate) {
        console.log(user);
        httpOptions['headers'] = this.tokenService.setTokenHeader(httpOptions['headers']);
        return this.http.patch(API_ROUTES.UPDATE_USER_INFO, JSON.stringify(user), httpOptions);
    }
}
