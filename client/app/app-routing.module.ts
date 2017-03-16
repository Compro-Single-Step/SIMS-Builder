
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full',canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    {
    path: 'app',   loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]
    },
     
    { path: 'stepbuilder',   loadChildren: './step-builder/step-builder.module#StepBuilderModule', canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);

