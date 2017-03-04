import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
    {
        path: '', redirectTo: 'stepbuilder', pathMatch: 'full'
    }, 
    {
        path: 'stepbuilder',   loadChildren: './step-builder/step-builder.module#StepBuilderModule'
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