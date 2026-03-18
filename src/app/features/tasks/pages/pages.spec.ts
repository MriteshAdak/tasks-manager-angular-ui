import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pages } from './pages';
import { APP_CONFIG_TOKEN } from '../../../core/config/app-config-token';
import { provideHttpClient } from '@angular/common/http';

describe('Pages', () => {
  let component: Pages;
  let fixture: ComponentFixture<Pages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pages],
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
    }).compileComponents();

    fixture = TestBed.createComponent(Pages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
