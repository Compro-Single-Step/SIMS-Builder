import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNavigatorComponent } from './view-navigator.component';

describe('ViewNavigatorComponent', () => {
  let component: ViewNavigatorComponent;
  let fixture: ComponentFixture<ViewNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
