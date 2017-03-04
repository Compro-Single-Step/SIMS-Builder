import { Component, OnInit } from '@angular/core';
import { node } from '../UIConfig.model';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  data: node;
  constructor() {
    this.data = new node();
  }

  ngOnInit() {
  }

}
