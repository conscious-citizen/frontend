import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {
    NbButtonModule,
    NbCardModule, NbContextMenuModule,
    NbDialogModule,
    NbDialogService,
    NbFormFieldModule, NbIconModule,
    NbInputModule,
    NbLayoutModule, NbMenuModule, NbMenuService,
    NbStatusService, NbTabsetModule,
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
import { CreateIncidentComponent } from './components/incident/create-incident/create-incident.component';
import { config } from 'rxjs';
import { ProfileComponent } from './components/profile/profile-page/profile-page.component';
import { MapComponent } from './components/map/map.component';
import {LoginService} from "./services/login.service";
import {RegistrationService} from "./services/registration.service";
import {ResetPasswordService} from "./services/reset-password.service";
import {UserCredentialsService} from "./services/user-credentials.service";
import {UserInfoService} from "./services/user-info.service";
import {UtilsService} from "./services/utils.service";
import {ViewIncidentComponent} from "./components/incident/view-incident/view-incident.component";
import { SwiperModule } from 'swiper/angular';
import {UserStoreService} from "./stores/user-store.service";
import {NbMenuInternalService} from "@nebular/theme/components/menu/menu.service";
import {DndDirective} from "./directives/dnd.directive";

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
        CreateIncidentComponent,
        ViewIncidentComponent,
        MapComponent,
        DndDirective
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
        SwiperModule,
        NbTabsetModule,
        NbContextMenuModule,
        NbMenuModule.forRoot(),
    ],
    providers: [NbStatusService,
        UserStoreService,
        NbDialogService,
        NbStatusService,
        LoginService,
        RegistrationService,
        UserCredentialsService,
        UserInfoService,
        UtilsService,
        ResetPasswordService,
        NbMenuService,
        NbDialogService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
