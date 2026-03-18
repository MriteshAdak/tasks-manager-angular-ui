import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { APP_CONFIG_TOKEN } from '../../../core/config/app-config-token';
import { Task, TaskCreate } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskApi {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG_TOKEN);

  private get endpoint(): string {
    return `${this.config.apiBasePath}/tasks`;
  }

  getTasks(): Promise<Task[]> {
    return firstValueFrom(this.http.get<Task[]>(this.endpoint));
  }

  createTask(task: TaskCreate): Promise<Task> {
    return firstValueFrom(this.http.post<Task>(this.endpoint, task));
  }

  updateTask(id: string, task: TaskCreate): Promise<Task> {
    return firstValueFrom(this.http.put<Task>(`${this.endpoint}/${id}`, task));
  }

  deleteTask(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.endpoint}/${id}`));
  }
}
