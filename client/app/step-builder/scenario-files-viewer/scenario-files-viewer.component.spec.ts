import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioFilesViewerComponent } from './scenario-files-viewer.component';

describe('ScenarioFilesViewerComponent', () => {
  let component: ScenarioFilesViewerComponent;
  let fixture: ComponentFixture<ScenarioFilesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioFilesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioFilesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
