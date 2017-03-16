import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DataService } from './data-service.service';

@Injectable()
export class TaskDataResolver implements Resolve<any> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      debugger;
    return this.dataService.getTaskData(route.params['id']);
  }
}