import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {API_ROUTES} from "../models/routes";

@Injectable({
    providedIn: 'root'
})

export class ResetPasswordService {


    constructor(private http: HttpClient) {
    }

    forgotPassword(user: any) {
        const body = {user_email: user.eMail};
        return this.http.post(API_ROUTES.FORGOT_PASSWORD_URL, body)
    }


    resetPassword(token:any, newPassword:any) {
        const body = { "token": token,"newPassword":newPassword,}
        return this.http.post(API_ROUTES.RESET_PASSWORD_URL, body)
    }
}
