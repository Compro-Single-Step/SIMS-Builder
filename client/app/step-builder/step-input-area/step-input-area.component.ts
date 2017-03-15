import { Component, OnInit, Input } from '@angular/core';
import { UIConfig } from '../../shared/UIConfig.model';

@Component({
  selector: 'app-step-input-area',
  templateUrl: './step-input-area.component.html',
  styleUrls: ['./step-input-area.component.scss']
})
export class StepInputAreaComponent implements OnInit {
  private selectedView: number;
  @Input() stepConfig : UIConfig;
  constructor() {
    this.selectedView = 1;
  }

  ngOnInit() {}

  setSelectedView($event) {
    this.selectedView = $event.viewNumber;
  }
}
