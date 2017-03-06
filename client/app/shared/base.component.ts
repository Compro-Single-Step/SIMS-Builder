import { node } from './UIConfig.model';
import { Input } from '@angular/core';

export class BaseComponent {
    @Input() compConfig: node;

    constructor() {
        this.compConfig = new node();
    }
}