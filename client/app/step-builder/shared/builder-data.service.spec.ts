import { TestBed, inject } from '@angular/core/testing';
import { BuilderDataService } from './builder-data.service';

describe('BuilderDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuilderDataService]
    });
  });

  it('should ...', inject([BuilderDataService], (service: BuilderDataService) => {
    expect(service).toBeTruthy();
  }));
});
