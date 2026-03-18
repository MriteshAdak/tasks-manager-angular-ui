import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  imports: [],
  template: `
    <select
      [value]="value()"
      [disabled]="disabled()"
      (change)="onChange($event)">
      @for (option of options(); track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
  `,
  styles: `
    select {
      width: 100%;
      height: 46px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #f8fafc;
      padding: 0 12px;
      color: #475569;
      font-size: 14px;
      font-weight: 600;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select {
  readonly options = input<SelectOption[]>([]);
  readonly value = input('');
  readonly disabled = input(false);
  readonly changed = output<string>();

  onChange(event: Event): void {
    const selected = (event.target as HTMLSelectElement).value;
    this.changed.emit(selected);
  }
}
