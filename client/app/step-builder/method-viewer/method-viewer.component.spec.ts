import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodViewerComponent } from './method-viewer.component';

describe('MethodViewerComponent', () => {
  let component: MethodViewerComponent;
  let fixture: ComponentFixture<MethodViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
