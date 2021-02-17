import { TestBed } from '@angular/core/testing';

import { UpdateStoreService } from './update-store.service';

describe('UpdateStoreService', () => {
  let service: UpdateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
