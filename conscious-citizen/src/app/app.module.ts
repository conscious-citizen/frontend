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
    NbThemeModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent
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
    ],
    providers: [NbStatusService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
