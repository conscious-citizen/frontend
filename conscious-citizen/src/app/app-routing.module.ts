import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./components/auth/registration/registration.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {PageNotFoundComponent} from "./shared-components/page-not-found/page-not-found.component";
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { MainPageComponent } from './components/main/main-page/main-page.component';
import {ProfileComponent} from "./components/profile/profile-page/profile-page.component";
import {MapComponent} from "./components/map/map.component";
import {IncidentComponent} from "./components/profile/incident/incident.component";

const routes: Routes = [
    { path: '', component: MainPageComponent},
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'map', component: MapComponent},
    { path: 'incident', component: IncidentComponent},
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
