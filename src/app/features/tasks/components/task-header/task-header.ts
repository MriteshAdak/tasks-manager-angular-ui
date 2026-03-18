import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  imports: [],
  templateUrl: './task-header.html',
  styleUrl: './task-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHeader {
  readonly title = input('TASK BOARD');
  readonly phrase = input('What are your plans for today?');
  readonly count = input(0);
  readonly enableRuntimeModeOverride = input(false);
  readonly dataMode = input<'api' | 'local'>('api');
  readonly modeChanged = output<'api' | 'local'>();

  setMode(mode: 'api' | 'local'): void {
    this.modeChanged.emit(mode);
  }
}
