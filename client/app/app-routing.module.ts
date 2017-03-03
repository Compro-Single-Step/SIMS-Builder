
import {RouterModule, Routes} from "@angular/router";



const appRoutes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    { 
        path: 'login',      loadChildren: './login/login.module#LoginModule'
    }
];

export const ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });