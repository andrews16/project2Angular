import { TestBed } from '@angular/core/testing';

import { RxCommunicationService } from './rx-communication.service';

describe('RxCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RxCommunicationService = TestBed.get(RxCommunicationService);
    expect(service).toBeTruthy();
  });
});
