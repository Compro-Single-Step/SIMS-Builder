import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule, TooltipModule } from 'ng2-bootstrap';
import { ButtonsModule, DropdownModule, PaginationModule  } from 'ng2-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table';
import { ModalModule } from 'ng2-bootstrap';
import 'parsleyjs';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ROUTES } from './administration-route';

import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchPipe } from './user-list/shared/search-pipe';
import { UserDataResolverService } from './user-list/shared/userDataResolver.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';

// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: [UserListComponent, AddUserComponent, ManageUsersComponent]
// })
// export class AdministrationModule { }




// import { WidgetModule } from '../layout/widget/widget.module';
// import { UtilsModule } from '../layout/utils/utils.module';
// import { JqSparklineModule } from '../components/sparkline/sparkline.module';


@NgModule({
  declarations: [
    SearchPipe, AddUserComponent, UserListComponent, ManageUsersComponent, UserDetailsFormComponent ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    DropdownModule.forRoot(),
    PaginationModule.forRoot(),
   // WidgetModule,
   // UtilsModule,
    Ng2TableModule,
    DataTableModule,
    ModalModule,
    ROUTES
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ UserDataResolverService]
})
export class AdministrationModule { }
