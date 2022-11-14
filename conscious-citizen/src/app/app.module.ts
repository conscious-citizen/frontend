import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbDialogService,
    NbFormFieldModule, NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbStatusService,
    NbThemeModule, NbTooltipModule, NbUserModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {LoginComponent} from "./components/auth/login/login.component";
import {PageNotFoundComponent} from './shared-components/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';
import {TextMaskModule} from 'angular2-text-mask';
import {ChangePasswordComponent} from './components/auth/change-password/change-password.component';
import { MainPageComponent } from './components/main/main-page/main-page.component';
import { TopPanelComponent } from './components/main/top-panel/top-panel.component';
import { ProfileComponent } from './components/profile/profile-page/profile-page.component';
import { IncidentComponent } from './components/profile/incident/incident.component';
import { config } from 'rxjs';
import { ProfileComponent } from './components/profile/profile.component';
import {LoginService} from "./services/login.service";
import {RegistrationService} from "./services/registration.service";
import {ResetPasswordService} from "./services/reset-password.service";
import {TokenService} from "./services/token.service";
import {UserInfoService} from "./services/user-info.service";
import {UtilsService} from "./services/utils.service";

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        PageNotFoundComponent,
        ForgotPasswordComponent,
        ChangePasswordComponent,
        MainPageComponent,
        TopPanelComponent,
        ProfileComponent,
        IncidentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NbCardModule,
        NbInputModule,
        NbThemeModule.forRoot({name: 'corporate'}),
        NbLayoutModule,
        NbFormFieldModule,
        NbIconModule,
        NbButtonModule,
        NbEvaIconsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NbTooltipModule,
        HttpClientModule,
        TextMaskModule,
        NbUserModule,
        NbDialogModule.forRoot(),
    ],
    providers: [NbStatusService, NbDialogService],
    providers: [
        NbStatusService,
        LoginService,
        RegistrationService,
        TokenService,
        UserInfoService,
        UtilsService,
        ResetPasswordService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
