import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-datetime-input',
  imports: [],
  template: ` 
    <label>
      Due Date (Optional)
      <input 
        type="date"
        [value]="value()"
        (input)="onInput($event)" />
    </label>
  `,
  styles: `
    label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94a3b8;
    }

    input {
      height: 46px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #f8fafc;
      padding: 0 12px;
      color: #475569;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimeInput {
  readonly value = input<string>('');
  readonly changed = output<string>();

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value ?? '';
    this.changed.emit(inputValue);
  }
}
