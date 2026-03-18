import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Task } from '../../models/task';
import { TaskDatetime } from '../../services/task-datetime';
import { StatusBadge } from '../../../../shared/components/ui/status-badge/status-badge';
import { VerticalNavButton } from '../../../../shared/components/ui/vertical-nav-button/vertical-nav-button';

const STATUS_ORDER: Task['status'][] = ['todo', 'in_progress', 'done'];
const EMPTY_TASK: Task = {
  id: '',
  title: '',
  status: 'todo',
  dueDate: null,
};

@Component({
  selector: 'app-task-item',
  imports: [VerticalNavButton, StatusBadge],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItem {
  private readonly datetime = inject(TaskDatetime);

  readonly task = input<Task>(EMPTY_TASK);
  readonly moved = output<'forward' | 'backward'>();
  readonly deleted = output<void>();

  protected readonly prevStatus = computed(() => {
    const index = STATUS_ORDER.indexOf(this.task().status);
    return index > 0 ? STATUS_ORDER[index - 1] : null;
  });

  protected readonly nextStatus = computed(() => {
    const index = STATUS_ORDER.indexOf(this.task().status);
    return index < STATUS_ORDER.length - 1 ? STATUS_ORDER[index + 1] : null;
  });

  protected formatDueDate(value: string | null): string {
    return this.datetime.toDisplayLocal(value);
  }
}
