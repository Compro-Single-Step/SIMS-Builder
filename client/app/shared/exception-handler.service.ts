import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class ExceptionHandlerService {

  constructor() { }

  globalConsole(msg) {
    if(isDevMode()){
      console.log(msg);
    }
  }

  globalAlert(msg){
    if(isDevMode()){
      alert(msg);
    }
  }

  globalLog(msg){
    this.globalAlert(msg);
    this.globalConsole(msg);
  }
}
