import { TestBed } from '@angular/core/testing';

import { WorkoutsResolverService } from './workouts-resolver.service';

describe('WorkoutsResolverService', () => {
  let service: WorkoutsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
