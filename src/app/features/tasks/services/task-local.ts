import { Injectable } from '@angular/core';
import { Task, TaskCreate } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskLocal {
  private readonly key = 'taskflow_guest_tasks';

  async getTasks(): Promise<Task[]> {
    return this.readTasks();
  }

  async createTask(task: TaskCreate): Promise<Task> {
    const tasks = this.readTasks();
    const newTask: Task = {
      ...task,
      id: this.nextId(),
    };

    this.writeTasks([...tasks, newTask]);
    return newTask;
  }

  async updateTask(id: string, task: TaskCreate): Promise<Task> {
    const tasks = this.readTasks();
    let found = false;

    const updatedTasks = tasks.map((entry) => {
      if (entry.id !== id) {
        return entry;
      }

      found = true;
      return {
        ...entry,
        ...task,
      };
    });

    if (!found) {
      throw new Error('Task not found in local storage');
    }

    this.writeTasks(updatedTasks);
    return updatedTasks.find((entry) => entry.id === id)!;
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = this.readTasks();
    this.writeTasks(tasks.filter((task) => task.id !== id));
  }

  private readTasks(): Task[] {
    const raw = localStorage.getItem(this.key);

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as Task[];
    } catch {
      return [];
    }
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  private nextId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return String(Date.now());
  }
}
