import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Task } from '../../models/task';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-kanban-board',
  imports: [TaskItem],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard {
  readonly todoTasks = input<Task[]>([]);
  readonly inProgressTasks = input<Task[]>([]);
  readonly doneTasks = input<Task[]>([]);

  readonly moved = output<{ taskId: string; direction: 'forward' | 'backward' }>();
  readonly deleted = output<string>();

  onMoved(taskId: string, direction: 'forward' | 'backward'): void {
    this.moved.emit({ taskId, direction });
  }

  onDeleted(taskId: string): void {
    this.deleted.emit(taskId);
  }
}
