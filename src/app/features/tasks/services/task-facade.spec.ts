import { TestBed } from '@angular/core/testing';

import { TaskFacade } from './task-facade';
import { APP_CONFIG_TOKEN } from '../../../core/config/app-config-token';
import { provideHttpClient } from '@angular/common/http';

describe('TaskFacade', () => {
  let service: TaskFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: APP_CONFIG_TOKEN,
          useValue: {
            apiBasePath: '/api',
            dataModeDefault: 'api',
            featureFlags: { enableRuntimeModeOverride: true },
          },
        },
      ],
    });
    service = TestBed.inject(TaskFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
