import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./components/auth/registration/registration.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {PageNotFoundComponent} from "./shared-components/page-not-found/page-not-found.component";

const routes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
