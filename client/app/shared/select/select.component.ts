import { Component, OnInit, Input } from '@angular/core';
import {node } from '../UIConfig.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  compConfig: node;
  constructor() {
    this.compConfig = new node();
  }

  ngOnInit() {
  }

}
