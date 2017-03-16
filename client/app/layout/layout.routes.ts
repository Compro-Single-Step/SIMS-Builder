import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  	{ path: '', component: Layout, children: [
	    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
			{ path: 'homepage', loadChildren: '../homePage/homePage.module#HomePageModule'},
	    { path: 'taskbuilder/:id', loadChildren: '../task-builder/task-builder.module#TaskBuilderModule'}
	  ]
	}
];

export const ROUTES = RouterModule.forChild(routes);
