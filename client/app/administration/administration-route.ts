import { Routes, RouterModule } from '@angular/router';
// import { UserListComponent } from './user-list/user-list.component';
// import { AddUserComponent } from './add-user/add-user.component';
// import { ManageUsersComponent } from './manage-users/manage-users.component'; 
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from '../_services/user.service';
import { UserDataResolverService } from './user-list/shared/userDataResolver.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [

  {
    path: '', component: ManageUsersComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: UserListComponent, resolve: { userData: UserDataResolverService } },
      { path: 'adduser', component: AddUserComponent }
    ]
  }
];

export const ROUTES = RouterModule.forChild(routes);
