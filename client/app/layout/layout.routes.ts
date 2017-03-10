import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  	{ path: '', component: Layout, children: [
	    { path: '', redirectTo: 'taskbuilder', pathMatch: 'full' },
	    { path: 'stepbuilder', loadChildren: '../step-builder/step-builder.module#StepBuilderModule'},
	    { path: 'taskbuilder', loadChildren: '../task-builder/task-builder.module#TaskBuilderModule' }
	  ]
	}
];

export const ROUTES = RouterModule.forChild(routes);
