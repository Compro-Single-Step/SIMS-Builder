import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalooReferenceComponent } from './baloo-reference.component';

describe('BalooReferenceComponent', () => {
  let component: BalooReferenceComponent;
  let fixture: ComponentFixture<BalooReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalooReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalooReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
