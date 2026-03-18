import { TestBed } from '@angular/core/testing';

import { TaskApi } from './task-api';
import { APP_CONFIG_TOKEN } from '../../../core/config/app-config-token';
import { provideHttpClient } from '@angular/common/http';

describe('TaskApi', () => {
  let service: TaskApi;

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
    service = TestBed.inject(TaskApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
