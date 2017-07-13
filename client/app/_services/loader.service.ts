import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()

export class LoaderService {
  
  loaderVisible: boolean = false;
  visibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor( ) { }

  setLoaderVisibility(isvisible: boolean){
    this.loaderVisible = isvisible;
    this.visibilityChange.next(this.loaderVisible);
  }
  
}
