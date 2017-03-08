import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view-navigator',
  templateUrl: './view-navigator.component.html',
  styleUrls: ['./view-navigator.component.scss']
})
export class ViewNavigatorComponent implements OnInit, OnChanges {

  @Input() viewCount: number;
  @Input() selectedViewNumber: number;
  @Output() viewClicked: EventEmitter<Object> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  ngOnChanges() {}

}
