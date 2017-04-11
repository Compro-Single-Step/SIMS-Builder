import { Injectable } from '@angular/core';

@Injectable()

export class LoaderService {
  
  private loaderVisible: boolean;

  constructor( ) { }

  setLoaderVisibility(isvisible: boolean){
    this.loaderVisible = isvisible;
  }

  getLoaderVisibility():boolean {
    return this.loaderVisible;
  }
  
}
