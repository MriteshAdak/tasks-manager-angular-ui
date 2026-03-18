import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TaskStatus } from '../../../../features/tasks/models/task-status';

@Component({
  selector: 'app-status-badge',
  imports: [],
  template: `
    <span class="status" [class]="'status status--' + status()">{{ label() }}</span>
  `,
  styles: `
    .status {
      display: inline-flex;
      align-items: center;
      height: 24px;
      border-radius: 999px;
      padding: 0 10px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .status--todo {
      color: #1d4ed8;
      background: #dbeafe;
    }

    .status--in_progress {
      color: #92400e;
      background: #fef3c7;
    }

    .status--done {
      color: #065f46;
      background: #d1fae5;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadge {
  readonly status = input<TaskStatus>('todo');
  protected readonly label = computed(() => {
    if (this.status() === 'in_progress') {
      return 'In Progress';
    }

    if (this.status() === 'done') {
      return 'Done';
    }

    return 'To Do';
  });
}
