import { EventEmitter } from '@angular/core';

class EventSrvc {
  eventMap: Object;
  constructor() {
    this.eventMap = {};
   }

  registerEvent(eventId){
    let event = new EventEmitter();
    this.eventMap[eventId] = event;
  }

  getEvent(eventId){
    return this.eventMap[eventId];
  }

  deregisterEvent(eventId){
    delete this.eventMap[eventId];
  }
}

export var EventService = new EventSrvc();
