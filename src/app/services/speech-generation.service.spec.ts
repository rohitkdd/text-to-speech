/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpeechGenerationService } from './speech-generation.service';

describe('Service: SpeechGeneration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeechGenerationService]
    });
  });

  it('should ...', inject([SpeechGenerationService], (service: SpeechGenerationService) => {
    expect(service).toBeTruthy();
  }));
});
