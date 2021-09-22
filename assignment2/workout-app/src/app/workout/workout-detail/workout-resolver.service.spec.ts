import { TestBed } from '@angular/core/testing';

import { WorkoutDetailResolverService } from './workout-detail-resolver.service';

describe('WorkoutResolverService', () => {
  let service: WorkoutDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
