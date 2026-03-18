import { Injectable, computed, signal } from '@angular/core';
import { Task } from './models/task';
import { AppErrorModel } from '../../core/error/app-error-model';

@Injectable({ providedIn: 'root' })
export class Store {
	readonly tasks = signal<Task[]>([]);
	readonly loading = signal(false);
	readonly error = signal<AppErrorModel | null>(null);
	readonly dataMode = signal<'api' | 'local'>('api');

	readonly todoTasks = computed(() => this.tasks().filter((task) => task.status === 'todo'));
	readonly inProgressTasks = computed(() =>
		this.tasks().filter((task) => task.status === 'in_progress')
	);
	readonly doneTasks = computed(() => this.tasks().filter((task) => task.status === 'done'));
	readonly totalTaskCount = computed(() => this.tasks().length);

	setTasks(tasks: Task[]): void {
		this.tasks.set([...tasks]);
	}

	addTask(task: Task): void {
		this.tasks.update((tasks) => [...tasks, task]);
	}

	updateTask(updatedTask: Task): void {
		this.tasks.update((tasks) =>
			tasks.map((task) => (task.id === updatedTask.id ? { ...updatedTask } : task))
		);
	}

	removeTask(taskId: string): void {
		this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
	}

	setLoading(loading: boolean): void {
		this.loading.set(loading);
	}

	setError(error: AppErrorModel | null): void {
		this.error.set(error);
	}

	setDataMode(mode: 'api' | 'local'): void {
		this.dataMode.set(mode);
	}

	clearError(): void {
		this.error.set(null);
	}
}
