import { TestBed } from '@angular/core/testing';

import { WorkoutDetailService } from './workout-detail.service';

describe('WorkoutService', () => {
  let service: WorkoutDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
