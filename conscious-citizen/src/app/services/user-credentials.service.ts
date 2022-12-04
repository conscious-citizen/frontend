import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KEYS} from "../models/constants";
import {LoggedUser} from "../models/User";

type UserDataForReset = {
    username: string,
    firstName: string,
    lastName: string,
    patronymic: string,
}

@Injectable({
    providedIn: 'root'
})
export class UserCredentialsService {
    private roles: Array<string> = [];

    constructor() {
    }

    signOut() {
        window.sessionStorage.clear();
    }

    public saveToken(token: string) {
        console.log('saveToken',token);
        window.sessionStorage.removeItem(KEYS.TOKEN);
        window.sessionStorage.setItem(KEYS.TOKEN, token);
    }

    public getToken(): string | null {
        return sessionStorage.getItem(KEYS.TOKEN);
    }

    public saveUsername(username: string) {
        console.log('saveUserName',username);
        window.sessionStorage.removeItem(KEYS.USERNAME);
        window.sessionStorage.setItem(KEYS.USERNAME, username);
    }

    public saveFirstName(firstName: string) {
        console.log('saveUserName',firstName);
        window.sessionStorage.removeItem(KEYS.FIRST_NAME);
        window.sessionStorage.setItem(KEYS.FIRST_NAME, firstName);
    }

    public saveLastName(lastName: string) {
        console.log('saveLastName',lastName);
        window.sessionStorage.removeItem(KEYS.LAST_NAME);
        window.sessionStorage.setItem(KEYS.LAST_NAME, lastName);
    }

    public savePatronymic(patronymic: string) {
        console.log('saveLastName',patronymic);
        window.sessionStorage.removeItem(KEYS.PATRONYMIC);
        window.sessionStorage.setItem(KEYS.PATRONYMIC, patronymic);
    }

    public saveTokenType(type: string) {
        console.log('saveTokenType',type);
        window.sessionStorage.removeItem(KEYS.TOKEN_TYPE);
        window.sessionStorage.setItem(KEYS.TOKEN_TYPE, type);
    }

    public getTokenType(): string | null {
        return sessionStorage.getItem(KEYS.TOKEN_TYPE);
    }

    public getFirstName(): string | null {
        return sessionStorage.getItem(KEYS.FIRST_NAME);
    }

    public getLastName(): string | null {
        return sessionStorage.getItem(KEYS.LAST_NAME);
    }

    public getPatronymic(): string | null {
        return sessionStorage.getItem(KEYS.PATRONYMIC);
    }

    public getUsername(): string | null {
        return sessionStorage.getItem(KEYS.USERNAME);
    }

    public saveAuthorities(authorities: string[]) {
        console.log('saveAuthorities');
        console.log(authorities);
        window.sessionStorage.removeItem(KEYS.AUTHORITIES);
        window.sessionStorage.setItem(KEYS.AUTHORITIES, JSON.stringify(authorities));
    }

    public getAuthorities(): string[] {
        this.roles = [];

        if (sessionStorage.getItem(KEYS.TOKEN)) {
            console.log('getAuthorities');
            console.log(sessionStorage.getItem(KEYS.AUTHORITIES));
            JSON.parse(<string>sessionStorage.getItem(KEYS.AUTHORITIES)).forEach((authority: string) => {
                this.roles.push(authority);
            });
        }

        return this.roles;
    }

    public resetUserDataWithoutLogout (data: UserDataForReset): void {
        this.saveUsername(data.username);
        this.saveFirstName(data.firstName);
        this.saveLastName(data.lastName);
        this.savePatronymic(data.patronymic);
    }

    public setTokenHeader(headers: HttpHeaders): HttpHeaders {
        if (headers.get('Authorization')) headers = headers.delete('Authorization');
        headers = headers.append('Authorization', this.getTokenType()+ ' ' + this.getToken());
        return headers;
    }

    readLoginResponse(loginBody: LoggedUser): void {
        this.saveUsername(loginBody.username);
        this.saveToken(loginBody.token);
        this.saveTokenType(loginBody.type);
        this.saveAuthorities(loginBody.role);
    }
}
