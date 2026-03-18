import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeInput } from './date-input';

describe('DatetimeInput', () => {
  let component: DatetimeInput;
  let fixture: ComponentFixture<DatetimeInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatetimeInput],
    }).compileComponents();

    fixture = TestBed.createComponent(DatetimeInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
