import { TestBed, inject } from '@angular/core/testing';
import { SkillManagerService } from './skill-manager.service';

describe('SkillManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillManagerService]
    });
  });

  it('should ...', inject([SkillManagerService], (service: SkillManagerService) => {
    expect(service).toBeTruthy();
  }));
});
