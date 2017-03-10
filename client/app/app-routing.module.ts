import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { AuthGuard } from './auth-guard.service';
const appRoutes: Routes = [
    // {
    //     path: '',redirectTo: 'app', pathMatch: 'full'
    // },
    {
        path: '', redirectTo: 'login', pathMatch: 'full',canActivate: [AuthGuard]
    }, 
    {
        path: 'login',   loadChildren: './login/login.module#LoginModule'
    },
    {
    path: 'app',   loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]
    },
    {path: 'stepbuilder',   loadChildren: './step-builder/step-builder.module#StepBuilderModule'}

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