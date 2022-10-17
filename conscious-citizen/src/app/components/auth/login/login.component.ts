import {Component, OnInit} from "@angular/core";
import {User} from "../../../models/User";
import {LoginService} from "../../../services/login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    showPassword = false;
    user: any;
    loggedUser: any;

    constructor(private loginService: LoginService) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.loginService.login({user_name:'qwery', password:'5555'}).subscribe((res) => {
                    this.loggedUser = res;
                });

    }

    getInputType() {
        if (this.showPassword) {
            return 'text';
        }
        return 'password';
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }

}
