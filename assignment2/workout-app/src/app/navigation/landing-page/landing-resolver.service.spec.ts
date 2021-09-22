import { TestBed } from '@angular/core/testing';

import { LandingResolverService } from './landing-resolver.service';

describe('LandingResolverService', () => {
  let service: LandingResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
