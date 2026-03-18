import { TaskStatus } from './task-status';

export interface Task {
	id: string;
	title: string;
	status: TaskStatus;
	dueDate: string | null;
}

export type TaskCreate = Omit<Task, 'id'>;
