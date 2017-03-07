import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepInputAreaComponent } from './step-input-area.component';

describe('StepInputAreaComponent', () => {
  let component: StepInputAreaComponent;
  let fixture: ComponentFixture<StepInputAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepInputAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepInputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
