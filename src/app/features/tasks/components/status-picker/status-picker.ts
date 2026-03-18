import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Select, SelectOption } from '../../../../shared/components/ui/select/select';
import { TaskStatus } from '../../models/task-status';

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

@Component({
  selector: 'app-status-picker',
  imports: [Select],
  templateUrl: './status-picker.html',
  styleUrl: './status-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusPicker {
  readonly value = input<TaskStatus>('todo');
  readonly changed = output<TaskStatus>();
  protected readonly options = STATUS_OPTIONS;

  onChanged(value: string): void {
    if (value === 'todo' || value === 'in_progress' || value === 'done') {
      this.changed.emit(value);
    }
  }
}
