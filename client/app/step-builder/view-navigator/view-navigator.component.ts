import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-view-navigator',
  templateUrl: './view-navigator.component.html',
  styleUrls: ['./view-navigator.component.scss']
})
export class ViewNavigatorComponent implements OnInit, OnChanges {

  @Input() viewCount: number;
  @Input() selectedViewNumber: number = 1;
  @Input() validationErrorsObj: Object;
  @Output() viewClicked: EventEmitter<Object> = new EventEmitter();
  viewCountArr: Array<number>;
  validationErrors: Object;

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.viewCount) {
      this.viewCountArr = Array(this.viewCount).map((x, i) => i);
    }
  }

  setSelectedView(viewNumber: number) {
    if(!ValidationService.validateViewAndShowErrors(this.validationErrorsObj["view"+this.selectedViewNumber], this.validationErrorsObj["view"+viewNumber]))
      this.viewClicked.emit({viewNumber: viewNumber});
  }
}
