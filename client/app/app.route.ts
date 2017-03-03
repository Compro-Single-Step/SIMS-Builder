import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

const app_routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: HomeComponent}
];

export const routing = RouterModule.forRoot(app_routes);