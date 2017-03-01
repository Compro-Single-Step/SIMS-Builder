import { Component, OnInit } from '@angular/core';
import {node} from '../UIConfig.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  data: node;
  constructor() {
    this.data = new node();
  }

  ngOnInit() {
  }

}
