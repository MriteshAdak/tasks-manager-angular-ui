import { TestBed } from '@angular/core/testing';

import { TaskDatetime } from './task-datetime';

describe('TaskDatetime', () => {
  let service: TaskDatetime;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDatetime);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
