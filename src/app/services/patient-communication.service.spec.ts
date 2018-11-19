import { TestBed } from '@angular/core/testing';

import { PatientCommunicationService } from './patient-communication.service';

describe('PatientCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientCommunicationService = TestBed.get(PatientCommunicationService);
    expect(service).toBeTruthy();
  });
});
