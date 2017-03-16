import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule, Router } from '@angular/router';
import { HomePage } from './homepage.component';

import { FormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: HomePage, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes), FormsModule ],
  declarations: [ HomePage ]
})
export class HomePageModule {
  static routes = routes;
}
