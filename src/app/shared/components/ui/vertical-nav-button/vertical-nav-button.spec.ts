import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavButton } from './vertical-nav-button';

describe('VerticalNavButton', () => {
  let component: VerticalNavButton;
  let fixture: ComponentFixture<VerticalNavButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalNavButton],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalNavButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
