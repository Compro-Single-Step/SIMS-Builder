import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInputAreaComponent } from './view-input-area.component';

describe('ViewInputAreaComponent', () => {
  let component: ViewInputAreaComponent;
  let fixture: ComponentFixture<ViewInputAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInputAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
