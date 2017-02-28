import { Component, OnInit, Input } from '@angular/core';
import { TextBox } from './text-box.model';
import { node } from '../UIConfig.model';

@Component({
  selector: 'app-text-box-component',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
  data: node;
  constructor() {
    this.data = new node();
   }

  ngOnInit() {
    console.log("ak91: inside textbox " + JSON.stringify(this.data));
  }
}
