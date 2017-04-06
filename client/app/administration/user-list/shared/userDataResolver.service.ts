import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../_services/user.service';

@Injectable()
export class UserDataResolverService implements Resolve<any> {
  constructor(
    private userDataService: UserService
  ) {}

  resolve(): Observable<any> {
    return this.userDataService.getUsers();
  }
}