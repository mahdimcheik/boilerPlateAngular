import { TestBed } from '@angular/core/testing';

import { SizeWatcherService } from './size-watcher.service';

describe('SizeWatcherService', () => {
  let service: SizeWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
