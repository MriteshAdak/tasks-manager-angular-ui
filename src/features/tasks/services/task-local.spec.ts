import { TestBed } from '@angular/core/testing';

import { TaskLocal } from './task-local';

describe('TaskLocal', () => {
  let service: TaskLocal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskLocal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
