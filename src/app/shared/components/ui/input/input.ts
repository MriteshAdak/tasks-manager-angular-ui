import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  template: ` 
    <input 
      [value]="value()" 
      [placeholder]="placeholder()" 
      [disabled]="disabled()" 
      (input)="propogateChange($event)" 
    /> 
  `,
  styles: `
    input {
      width: 100%;
      height: 46px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #f8fafc;
      padding: 0 12px;
      color: #475569;
      outline: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Input {
  readonly value = input<string>("");
  readonly placeholder = input<string>("");
  readonly disabled = input<boolean>(false);
  readonly changed = output<string>();
  // readonly enterPressed = output<string>();

  propogateChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value ?? "";
    this.changed.emit(inputValue);
  }
}
