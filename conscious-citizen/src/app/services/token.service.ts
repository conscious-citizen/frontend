import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KEYS} from "../models/constants";
import {LoggedUser} from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
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

    public saveTokenType(type: string) {
        console.log('saveTokenType',type);
        window.sessionStorage.removeItem(KEYS.TOKEN_TYPE);
        window.sessionStorage.setItem(KEYS.TOKEN_TYPE, type);
    }

    public getTokenType(): string | null {
        return sessionStorage.getItem(KEYS.TOKEN_TYPE);
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
