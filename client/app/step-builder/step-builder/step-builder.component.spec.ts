import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBuilderComponent } from './step-builder.component';

describe('StepBuilderComponent', () => {
  let component: StepBuilderComponent;
  let fixture: ComponentFixture<StepBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
