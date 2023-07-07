import { TestBed } from '@angular/core/testing';

import { PetService } from './user-pets.service';

describe('UserPetsService', () => {
  let service: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
