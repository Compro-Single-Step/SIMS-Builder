import { Injectable } from '@angular/core';

@Injectable()

export class LoaderService {
  
  private loader = {
    Visible : false
  };

  constructor( ) { }

  setLoaderVisibility(isvisible: boolean){
    this.loader.Visible = isvisible;
  }

  getLoaderVisibility() {
    return this.loader;
  }
  
}
