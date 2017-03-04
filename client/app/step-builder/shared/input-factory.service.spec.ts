import { TestBed, inject } from '@angular/core/testing';
import { InputFactoryService } from './input-factory.service';

describe('InputFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputFactoryService]
    });
  });

  it('should ...', inject([InputFactoryService], (service: InputFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
