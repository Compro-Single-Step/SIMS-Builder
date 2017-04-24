import { EventEmitter } from '@angular/core';

class EventSrvc {
  eventMap: Object;

  constructor() {
    this.eventMap = {};
  }

  registerEvent(eventId) {
    if (!this.getEvent(eventId)) {
      let event = {
        emitterObj: new EventEmitter(),
        subscriptions: []
      };
      this.eventMap[eventId] = event;
    }
  }

  getEvent(eventId) {
    return this.eventMap[eventId];
  }

  subscribeEvent(eventId, func) {
    let event = this.getEvent(eventId);
    if (!event) {
      this.registerEvent(eventId);
      event = this.getEvent(eventId);
    }
    let subscription = event.emitterObj.subscribe(func);
    event.subscriptions.push(subscription);
    return subscription;
  }

  unsubscribeEvent(subscriptionId) {
    subscriptionId.unsubscribe();
  }

  emitEvent(eventId, payload) {
    let event = this.getEvent(eventId);
    event.emitterObj.emit(payload);
  }

  dispose() {
    this.eventMap = {};
  }
}

export var EventService = new EventSrvc();
