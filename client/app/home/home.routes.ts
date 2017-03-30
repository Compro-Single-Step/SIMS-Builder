import { Routes, RouterModule } from '@angular/router';
import { Layout } from './layout.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  	{ path: '', component: Layout, children: [
			{ path: '', loadChildren: '../taskSearch/taskSearch.module#TaskSearchModule', pathMatch: 'full'},
	    { path: 'task/:id', loadChildren: '../task-builder/task-builder.module#TaskBuilderModule'},
			{ path: 'admin', loadChildren: '../administration/administration.module#AdministrationModule'}
	  ]
	},
	{
		path: 'task/:id/step/:stepIndex', loadChildren: '../step-builder/step-builder.module#StepBuilderModule'
	}
];

export const ROUTES = RouterModule.forChild(routes);
