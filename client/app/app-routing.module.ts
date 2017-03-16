
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TasksearchComponent } from './tasksearch/tasksearch.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    
    { path: 'tasksearch', component: TasksearchComponent, canActivate: [AuthGuard] },
  
    { path: 'stepbuilder',   loadChildren: './step-builder/step-builder.module#StepBuilderModule', canActivate: [AuthGuard] },

    { path: '', component: TasksearchComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'tasksearch' }
];

export const routing = RouterModule.forRoot(appRoutes);

