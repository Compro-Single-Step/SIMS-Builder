
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { ROUTES }       from './home.routes';

import { TooltipModule } from 'ng2-bootstrap';

import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Navbar } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ROUTES,
    FormsModule],
  declarations: [
    Layout,
    Sidebar,
    Navbar
  ]
})
export class HomeModule {
}
