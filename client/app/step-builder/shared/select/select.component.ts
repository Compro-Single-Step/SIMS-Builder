import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() data: item;
  constructor() { }

  ngOnInit() {

  }

}
class item {
  id: string;
  label: string;
  desc: {
    basic: string,
    detailed? : string
  };
  itemRenderer: string;
  itemType: string;
  mandatory: boolean;
  rendererProperties: {
    dataType: string
  };
  modelReference: string;
}
