import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UIConfig } from '../../shared/UIConfig.model';

@Component({
  selector: 'app-step-input-area',
  templateUrl: './step-input-area.component.html',
  styleUrls: ['./step-input-area.component.scss']
})
export class StepInputAreaComponent implements OnInit {
  @Input() selectedView: number;
  @Input() ValidationErrorsObj: Object;
  @Input() stepConfig: UIConfig;
  @Output() viewChanged: EventEmitter<Object> = new EventEmitter();
  @Output() uiRendered: EventEmitter<Object> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  setSelectedView($event) {
    this.selectedView = $event.viewNumber;
    this.viewChanged.emit({viewNumber: this.selectedView});
  }

  emitEventToParent($event) {
    this.uiRendered.emit({uiRendered: $event.uiRendered});
  }
}
