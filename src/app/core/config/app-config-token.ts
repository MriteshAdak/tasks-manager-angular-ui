import { InjectionToken } from '@angular/core';

export interface AppConfigToken {
    apiBasePath: string;
    dataModeDefault: 'api' | 'local';
    featureFlags: {
        enableRuntimeModeOverride: boolean;
    };
}

export const APP_CONFIG_TOKEN = new InjectionToken<AppConfigToken>('APP_CONFIG_TOKEN');