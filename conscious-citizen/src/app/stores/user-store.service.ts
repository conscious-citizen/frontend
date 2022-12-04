import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_ROUTES} from "../models/routes";
import {BehaviorSubject} from "rxjs";
import {User, UserInfo} from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private _user: BehaviorSubject<UserInfo> | null = null;

    constructor(private http: HttpClient) {
    }

    setCurrentUser(user: UserInfo): void {
        if (this._user) this._user.next(user);
        else this._user = new BehaviorSubject<UserInfo>(user);
    }

    get user(): BehaviorSubject<UserInfo> | null {
        return this._user;
    }
}
