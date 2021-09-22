import { TestBed } from '@angular/core/testing';

import { MyWorkoutsResolverService } from './my-workouts-resolver.service';

describe('MyWorkoutsResolverService', () => {
  let service: MyWorkoutsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyWorkoutsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
