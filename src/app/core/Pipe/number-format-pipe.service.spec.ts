import { TestBed } from '@angular/core/testing';

import { NumberFormatPipeService } from './number-format-pipe.service';

describe('NumberFormatPipeService', () => {
  let service: NumberFormatPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberFormatPipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
