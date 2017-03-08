import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view-navigator',
  templateUrl: './view-navigator.component.html',
  styleUrls: ['./view-navigator.component.scss']
})
export class ViewNavigatorComponent implements OnInit, OnChanges {

  @Input() viewCount: number;
  @Input() selectedViewNumber: number = 1;
  @Output() viewClicked: EventEmitter<Object> = new EventEmitter();
  viewCountArr: Array<number>;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.viewCount) {
      this.viewCountArr = Array(this.viewCount).map((x, i) => i);
    }
  }

  setSelectedView(viewNumber: number) {
    this.viewClicked.emit({viewNumber: viewNumber});
  }
}
