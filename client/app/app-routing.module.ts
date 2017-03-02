import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";



const appRoutes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    { 
        path: 'login',      loadChildren: './login/login.module#LoginModule'
    }
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(appRoutes) 
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}