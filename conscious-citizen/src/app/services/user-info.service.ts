import {Injectable} from "@angular/core";
import {User, UserInfoForUpdate} from "../models/User";
import {API_ROUTES} from "../models/routes";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    constructor(private http: HttpClient, private tokenService: TokenService) {
    }

    getUserInfo() {
        httpOptions['headers'] = this.tokenService.setTokenHeader(httpOptions['headers']);
        return this.http.get(API_ROUTES.GET_USER_INFO, httpOptions);
    }

    patchUserInfo(user: UserInfoForUpdate) {
        console.log(user);
        httpOptions['headers'] = this.tokenService.setTokenHeader(httpOptions['headers']);
        return this.http.patch(API_ROUTES.UPDATE_USER_INFO, JSON.stringify(user), httpOptions);
    }
}
