import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { APP_CONFIG_TOKEN, AppConfigToken } from './core/config/app-config-token';
import { requestIdInterceptor } from './core/http/interceptors/request-id-interceptor';
import { authPlaceholderInterceptor } from './core/http/interceptors/auth-placeholder-interceptor';
import { errorMappingInterceptor } from './core/http/interceptors/error-mapping-interceptor';

const appConfigToken: AppConfigToken = {
  apiBasePath: '/api',
  dataModeDefault: 'api',
  featureFlags: {
    enableRuntimeModeOverride: true,
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        requestIdInterceptor,
        authPlaceholderInterceptor,
        errorMappingInterceptor,
      ])
    ),
    { provide: APP_CONFIG_TOKEN, useValue: appConfigToken },
  ],
};
