import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {
    NbButtonModule,
    NbCardModule,
    NbFormFieldModule, NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbStatusService,
    NbThemeModule, NbTooltipModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {LoginComponent} from "./components/auth/login/login.component";
import { PageNotFoundComponent } from './shared-components/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        PageNotFoundComponent
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
        HttpClientModule
    ],
    providers: [NbStatusService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
