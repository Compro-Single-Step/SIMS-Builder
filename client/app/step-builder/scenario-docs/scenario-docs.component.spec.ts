import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDocsComponent } from './scenario-docs.component';

describe('ScenarioDocsComponent', () => {
  let component: ScenarioDocsComponent;
  let fixture: ComponentFixture<ScenarioDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
