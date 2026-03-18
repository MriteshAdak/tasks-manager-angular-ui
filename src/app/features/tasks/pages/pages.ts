import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APP_CONFIG_TOKEN } from '../../../core/config/app-config-token';
import { Button } from '../../../shared/components/ui/button/button';
import { DatetimeInput } from '../../../shared/components/ui/date-input/date-input';
import { Input } from '../../../shared/components/ui/input/input';
import { KanbanBoard } from '../components/kanban-board/kanban-board';
import { TaskHeader } from '../components/task-header/task-header';
import { TaskFacade } from '../services/task-facade';

@Component({
  selector: 'app-pages',
  imports: [ReactiveFormsModule, TaskHeader, KanbanBoard, Input, DatetimeInput, Button],
  templateUrl: './pages.html',
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pages {
  protected readonly facade = inject(TaskFacade);
  private readonly config = inject(APP_CONFIG_TOKEN);

  protected readonly enableRuntimeModeOverride =
    this.config.featureFlags.enableRuntimeModeOverride;

  protected readonly form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dueDate: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    void this.facade.loadTasks();
  }

  protected async createTask(): Promise<void> {
    const title = this.form.controls.title.value.trim();
    if (!title) {
      return;
    }

    await this.facade.createTask({
      title,
      status: 'todo',
      dueDate: this.form.controls.dueDate.value || null,
    });

    this.form.setValue({ title: '', dueDate: '' });
  }
}
