import { TestBed } from '@angular/core/testing';

import { ProducterviceTsService } from './productervice.ts.service';

describe('ProducterviceTsService', () => {
  let service: ProducterviceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducterviceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
