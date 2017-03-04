import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFileStoreComponent } from './task-file-store.component';

describe('TaskFileStoreComponent', () => {
  let component: TaskFileStoreComponent;
  let fixture: ComponentFixture<TaskFileStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFileStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFileStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
