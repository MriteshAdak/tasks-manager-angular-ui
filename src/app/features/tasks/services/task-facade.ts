import { inject, Injectable } from '@angular/core';
import { APP_CONFIG_TOKEN } from '../../../core/config/app-config-token';
import { AppErrorModel } from '../../../core/error/app-error-model';
import { Task, TaskCreate } from '../models/task';
import { TaskApi } from './task-api';
import { TaskDatetime } from './task-datetime';
import { TaskLocal } from './task-local';
import { Store } from '../store';

@Injectable({
  providedIn: 'root',
})
export class TaskFacade {
  private readonly store = inject(Store);
  private readonly api = inject(TaskApi);
  private readonly local = inject(TaskLocal);
  private readonly datetime = inject(TaskDatetime);
  private readonly config = inject(APP_CONFIG_TOKEN);

  readonly tasks = this.store.tasks;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly dataMode = this.store.dataMode;
  readonly todoTasks = this.store.todoTasks;
  readonly inProgressTasks = this.store.inProgressTasks;
  readonly doneTasks = this.store.doneTasks;
  readonly totalTaskCount = this.store.totalTaskCount;

  constructor() {
    this.store.setDataMode(this.config.dataModeDefault);
  }

  async loadTasks(): Promise<void> {
    this.store.setLoading(true);
    try {
      const tasks = await this.provider().getTasks();
      this.store.setTasks(tasks);
      this.store.clearError();
    } catch (error) {
      this.store.setError(this.toAppError(error));
    } finally {
      this.store.setLoading(false);
    }
  }

  async createTask(taskInput: TaskCreate): Promise<void> {
    this.store.setLoading(true);
    try {
      const created = await this.provider().createTask(this.normalizeTaskInput(taskInput));
      this.store.addTask(created);
      this.store.clearError();
    } catch (error) {
      this.store.setError(this.toAppError(error));
    } finally {
      this.store.setLoading(false);
    }
  }

  async moveTask(taskId: string, direction: 'forward' | 'backward'): Promise<void> {
    const existing = this.store.tasks().find((task) => task.id === taskId);
    if (!existing) {
      return;
    }

    const statusOrder: Task['status'][] = ['todo', 'in_progress', 'done'];
    const currentIndex = statusOrder.indexOf(existing.status);
    const nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= statusOrder.length) {
      return;
    }

    const updatedTask: Task = {
      ...existing,
      status: statusOrder[nextIndex],
    };

    this.store.updateTask(updatedTask);

    try {
      await this.provider().updateTask(taskId, this.normalizeTaskInput(updatedTask));
      this.store.clearError();
    } catch (error) {
      this.store.setError(this.toAppError(error));
      await this.loadTasks();
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      await this.provider().deleteTask(taskId);
      this.store.removeTask(taskId);
      this.store.clearError();
    } catch (error) {
      this.store.setError(this.toAppError(error));
    }
  }

  setDataMode(mode: 'api' | 'local'): void {
    if (mode === this.store.dataMode()) {
      return;
    }

    this.store.setDataMode(mode);
    this.store.clearError();
    void this.loadTasks();
  }

  private provider(): {
    getTasks: () => Promise<Task[]>;
    createTask: (task: TaskCreate) => Promise<Task>;
    updateTask: (id: string, task: TaskCreate) => Promise<Task>;
    deleteTask: (id: string) => Promise<void>;
  } {
    return this.store.dataMode() === 'api' ? this.api : this.local;
  }

  private normalizeTaskInput(task: TaskCreate): TaskCreate {
    return {
      ...task,
      dueDate: this.datetime.toUtcIso(task.dueDate ?? '') ?? null,
    };
  }

  private toAppError(error: unknown): AppErrorModel {
    if (this.isAppError(error)) {
      return error;
    }

    return {
      code: 'TASK_UNKNOWN_ERROR',
      message: 'Unexpected error while processing request.',
      httpStatus: 500,
      requestId: 'unknown',
    };
  }

  private isAppError(error: unknown): error is AppErrorModel {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'message' in error &&
      'httpStatus' in error &&
      'requestId' in error
    );
  }
}
