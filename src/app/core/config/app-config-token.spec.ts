import { AppConfigToken } from './app-config-token';

describe('AppConfigToken', () => {
  it('should type a valid config object', () => {
    const config: AppConfigToken = {
      apiBasePath: '/api',
      dataModeDefault: 'api',
      featureFlags: {
        enableRuntimeModeOverride: true,
      },
    };

    expect(config.apiBasePath).toBe('/api');
  });
});
