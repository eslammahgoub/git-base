import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';

// @NOTE: this test not needed I test those functions in the app component I know that there is a more case here but for timing, I'll leave it like that
describe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(RepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
