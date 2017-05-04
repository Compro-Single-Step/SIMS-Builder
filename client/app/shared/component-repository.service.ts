import { Injectable } from '@angular/core';
import { CompRepo } from './component-repository.config';

@Injectable()
export class ComponentRepositoryService {

  constructor() { }

  getDynamicCompClass(type) {
    return CompRepo[type];
  }
}

export function getEntryComps() {
  return Comps;
}

export function getDeclarationComps() {
  return Comps;
}

const Comps = (function () {
  let compArray = [];
  for (let key in CompRepo) {
    compArray.push(CompRepo[key]);
  }
  return compArray;
})();



