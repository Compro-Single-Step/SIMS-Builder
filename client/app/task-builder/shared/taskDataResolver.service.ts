import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TaskDataService } from '../../_services/taskData.service';

@Injectable()
export class TaskDataResolver implements Resolve<any> {
  constructor(
    private dataService: TaskDataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.dataService.getTaskData(route.params['id']);
  }
}