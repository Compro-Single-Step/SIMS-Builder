import { TestBed, inject } from '@angular/core/testing';
import { ComponentRepositoryService } from './component-repository.service';

describe('ComponentRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentRepositoryService]
    });
  });

  it('should ...', inject([ComponentRepositoryService], (service: ComponentRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
