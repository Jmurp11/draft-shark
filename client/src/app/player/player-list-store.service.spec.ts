import { TestBed } from '@angular/core/testing';

import { PlayerListStoreService } from './player-list-store.service';

describe('PlayerListStoreService', () => {
  let service: PlayerListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerListStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
